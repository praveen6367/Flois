import React from 'react';

interface ArticleBodyProps {
  contentHtml: string;
}

export function ArticleBody({ contentHtml }: ArticleBodyProps) {
  return (
    <article className="w-full bg-white py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-6 sm:px-12">
        {/* Decorative rule */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-[#E8E6DF]" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#4B644C] shrink-0">
            <path d="M12 2C12 2 8 6 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 6 12 2 12 2Z" fill="currentColor" opacity="0.6"/>
            <path d="M12 14C12 14 6 16 6 20H18C18 16 12 14 12 14Z" fill="currentColor" opacity="0.4"/>
          </svg>
          <div className="h-px flex-1 bg-[#E8E6DF]" />
        </div>

        {/* Rich text content with editorial typography */}
        <div
          className="
            prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-[#121412]
            prose-h1:text-5xl prose-h1:leading-tight
            prose-h2:text-3xl prose-h2:leading-snug prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:leading-snug prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[#3A3E3A] prose-p:font-sans prose-p:font-light prose-p:leading-[1.85] prose-p:text-base
            prose-a:text-[#4B644C] prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-[#3A5040]
            prose-strong:text-[#121412] prose-strong:font-semibold
            prose-em:italic prose-em:text-[#4A4E4A]
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
            prose-li:text-[#3A3E3A] prose-li:font-sans prose-li:font-light prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-[#4B644C] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#4A4E4A] prose-blockquote:not-italic
            prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:leading-snug prose-blockquote:my-10
            prose-img:rounded-2xl prose-img:shadow-md
            prose-hr:border-[#E8E6DF] prose-hr:my-12
            prose-table:w-full prose-table:text-sm
            prose-th:text-[#121412] prose-th:font-semibold prose-th:bg-[#FAF9F5] prose-th:p-3
            prose-td:text-[#3A3E3A] prose-td:p-3 prose-td:border-b prose-td:border-[#E8E6DF]
            [&_blockquote]:bg-[#FAF9F5] [&_blockquote]:rounded-r-2xl [&_blockquote]:py-5 [&_blockquote]:pr-6
          "
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </article>
  );
}
