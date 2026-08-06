import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface StoredReview {
  id: string;
  author: string;
  email?: string;
  location?: string;
  rating: number;
  body: string;
  productName: string;
  productHandle: string;
  date: string;
  avatarUrl?: string;
  photoUrl?: string;
  helpfulCount: number;
  isUserSubmitted?: boolean;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const REVIEWS_FILE = path.join(DATA_DIR, 'user-reviews.json');

// Helper to safely read stored reviews from JSON file
function readReviewsFromFile(): StoredReview[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(REVIEWS_FILE)) {
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify([]), 'utf-8');
      return [];
    }
    const content = fs.readFileSync(REVIEWS_FILE, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('[API Reviews] Read error:', err);
    return [];
  }
}

// Helper to write reviews to JSON file
function writeReviewsToFile(reviews: StoredReview[]): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[API Reviews] Write error:', err);
    return false;
  }
}

// GET /api/reviews?productHandle=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get('productHandle');
    
    let reviews = readReviewsFromFile();
    
    if (handle) {
      reviews = reviews.filter(
        (r) =>
          r.productHandle?.toLowerCase() === handle.toLowerCase() ||
          handle.toLowerCase().includes(r.productHandle?.toLowerCase() || '___')
      );
    }
    
    return NextResponse.json({ success: true, reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST /api/reviews
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { author, email, location, rating, body: reviewText, productName, productHandle, avatarUrl, photoUrl } = body;

    if (!author || !rating || !reviewText || !productName || !productHandle) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: author, rating, body, productName, productHandle' },
        { status: 400 }
      );
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // Pick random Indian avatar fallback if none provided
    const defaultAvatars = [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    ];
    const finalAvatar = avatarUrl || defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

    const newReview: StoredReview = {
      id: `user-rev-${Date.now()}`,
      author: author.trim(),
      email: email?.trim(),
      location: location?.trim() || 'Verified Customer',
      rating: Number(rating) || 5,
      body: reviewText.trim(),
      productName: productName.trim(),
      productHandle: productHandle.trim(),
      date: formattedDate,
      avatarUrl: finalAvatar,
      photoUrl: photoUrl || undefined,
      helpfulCount: 0,
      isUserSubmitted: true
    };

    const existingReviews = readReviewsFromFile();
    const updatedReviews = [newReview, ...existingReviews];
    writeReviewsToFile(updatedReviews);

    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (error) {
    console.error('[API Reviews] POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to save review' }, { status: 500 });
  }
}
