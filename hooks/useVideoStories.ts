'use client';

import { useState } from 'react';
import { VideoStoryMetaobject } from '@/types/metaobject';

export function useVideoStories() {
  const [selectedStory, setSelectedStory] = useState<VideoStoryMetaobject | null>(null);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  const openModal = (story: VideoStoryMetaobject) => {
    setSelectedStory(story);
  };

  const closeModal = () => {
    setSelectedStory(null);
  };

  return {
    selectedStory,
    openModal,
    closeModal,
    activePlayingId,
    setActivePlayingId
  };
}
