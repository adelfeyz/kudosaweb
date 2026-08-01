'use client';

import React from 'react';
import { getOptimizedImageUrl } from '@adelfeyz/sdk';

/** Minimal TipTap JSON shape for public blog rendering (no @tiptap dependency). */
interface JSONContent {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: JSONContent[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
}

interface BlogContentRendererProps {
  content: string;
  className?: string;
}

interface RenderNodeProps {
  node: JSONContent;
  children?: React.ReactNode;
  key?: string | number;
}

const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({ content, className = '' }) => {
  const parseContent = (content: string): JSONContent => {
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error('Error parsing TipTap content:', error);
      return { type: 'doc', content: [] };
    }
  };

  const renderNode = ({ node, children, key }: RenderNodeProps): React.ReactNode => {
    if (!node.type) return null;

    const nodeKey = key || Math.random();

    switch (node.type) {
      case 'doc':
        return (
          <div key={nodeKey} className={`prose prose-lg max-w-none ${className}`}>
            {children}
          </div>
        );
      
      case 'paragraph':
        return (
          <p key={nodeKey} className="mb-4">
            {children}
          </p>
        );
      
      case 'heading':
        const level = node.attrs?.level || 1;
        const headingClasses = {
          1: 'text-3xl font-bold mb-6 mt-8',
          2: 'text-2xl font-bold mb-5 mt-7',
          3: 'text-xl font-bold mb-4 mt-6',
          4: 'text-lg font-bold mb-3 mt-5',
          5: 'text-base font-bold mb-2 mt-4',
          6: 'text-sm font-bold mb-2 mt-4'
        };
        
        switch (level) {
          case 1:
            return <h1 key={nodeKey} className={headingClasses[1]}>{children}</h1>;
          case 2:
            return <h2 key={nodeKey} className={headingClasses[2]}>{children}</h2>;
          case 3:
            return <h3 key={nodeKey} className={headingClasses[3]}>{children}</h3>;
          case 4:
            return <h4 key={nodeKey} className={headingClasses[4]}>{children}</h4>;
          case 5:
            return <h5 key={nodeKey} className={headingClasses[5]}>{children}</h5>;
          case 6:
            return <h6 key={nodeKey} className={headingClasses[6]}>{children}</h6>;
          default:
            return <h1 key={nodeKey} className={headingClasses[1]}>{children}</h1>;
        }
      
      case 'text':
        let textContent: React.ReactNode = node.text || '';
        
        // Apply marks
        if (node.marks) {
          node.marks.forEach(mark => {
            switch (mark.type) {
              case 'bold':
                textContent = <strong key={Math.random()}>{textContent}</strong>;
                break;
              case 'italic':
                textContent = <em key={Math.random()}>{textContent}</em>;
                break;
              case 'underline':
                textContent = <u key={Math.random()}>{textContent}</u>;
                break;
              case 'code':
                textContent = <code key={Math.random()} className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{textContent}</code>;
                break;
              case 'link':
                textContent = (
                  <a 
                    key={Math.random()}
                    href={String(mark.attrs?.href ?? '#')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 underline"
                  >
                    {textContent}
                  </a>
                );
                break;
            }
          });
        }
        
        return textContent;
      
      case 'bulletList':
        return (
          <ul key={nodeKey} className="list-disc list-inside mb-4 space-y-2">
            {children}
          </ul>
        );
      
      case 'orderedList':
        return (
          <ol key={nodeKey} className="list-decimal list-inside mb-4 space-y-2">
            {children}
          </ol>
        );
      
      case 'listItem':
        return (
          <li key={nodeKey}>
            {children}
          </li>
        );
      
      case 'blockquote':
        return (
          <blockquote key={nodeKey} className="border-s-4 border-primary-500 ps-4 py-2 mb-4 italic text-gray-700">
            {children}
          </blockquote>
        );
      
      case 'codeBlock':
        const language = node.attrs?.language || 'text';
        return (
          <pre key={nodeKey} className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <code className={`language-${language}`}>
              {node.content?.map((child) => 
                child.type === 'text' ? child.text : ''
              ).join('')}
            </code>
          </pre>
        );
      
      case 'image': {
        const src = node.attrs?.src != null ? String(node.attrs.src) : '';
        const alt = node.attrs?.alt != null ? String(node.attrs.alt) : '';
        const title = node.attrs?.title != null ? String(node.attrs.title) : '';
        if (!src) {
          console.warn('Image node missing src attribute:', node);
          return null;
        }
        return (
          <figure key={nodeKey} className="my-6">
            <img 
              src={getOptimizedImageUrl(src)} 
              alt={alt || ''} 
              title={title || ''}
              className="w-full h-auto rounded-lg shadow-md"
              onError={(e) => {
                // Fallback for broken images
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = '<div class="w-full h-32 flex items-center justify-center bg-gray-200 rounded-lg"><i class="fa-solid fa-image text-gray-400 text-2xl"></i></div>';
              }}
            />
            {title && (
              <figcaption className="text-center text-sm text-gray-600 mt-2">
                {title}
              </figcaption>
            )}
          </figure>
        );
      }
      
      case 'horizontalRule':
        return <hr key={nodeKey} className="my-8 border-gray-300" />;
      
      default:
        return <span key={nodeKey}>{children}</span>;
    }
  };

  const renderContent = (content: JSONContent): React.ReactNode => {
    if (!content.content) {
      return content.type === 'text' ? content.text : null;
    }

    return content.content.map((child, index) => 
      renderNode({
        node: child,
        children: renderContent(child),
        key: index
      })
    );
  };

  const parsedContent = parseContent(content);
  
  return (
    <div className="blog-content">
      {renderContent(parsedContent)}
    </div>
  );
};

export default BlogContentRenderer;
