import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "../../../lib/db.server";
import { buildArticleTeaser } from "../../../lib/articleTeaser";
import ArticleCoverImage from "./ArticleCoverImage";
import ArticleFullBody from "./ArticleFullBody";
import "../articles.css";
import "./article-detail.css";

export const runtime = "edge";

const FALLBACK_OG_IMAGE = "/good_luck_island_logo_full.png";

interface ArticleRow {
  id: number;
  category: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  date: string | null;
  read_time: string | null;
  image: string | null;
}

async function getArticle(id: string): Promise<ArticleRow | null> {
  const db = getDb();
  const row = await db
    .prepare("SELECT * FROM articles WHERE id = ?")
    .bind(Number(id))
    .first<ArticleRow>();
  return row ?? null;
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) return {};

  const { teaserText } = buildArticleTeaser(article.body);
  const image = article.image ?? FALLBACK_OG_IMAGE;

  return {
    title: article.title,
    description: teaserText || article.excerpt || undefined,
    openGraph: {
      title: article.title,
      description: teaserText || article.excerpt || undefined,
      images: [{ url: image }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: teaserText || article.excerpt || undefined,
      images: [image],
    },
  };
}

export default async function ArticlePage(
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  const { teaserHtml } = buildArticleTeaser(article.body);

  return (
    <div className="articles-page article-detail-page">
      <article className="article-detail">
        <ArticleCoverImage image={article.image} title={article.title} />
        <div className="article-detail-body">
          <span className="article-detail-tag">{article.category}</span>
          <h1 className="article-detail-title">{article.title}</h1>
          <div className="article-detail-meta">
            <span>{article.date}</span>
            <span className="article-detail-meta-dot" />
            <span>{article.read_time}</span>
          </div>
          <ArticleFullBody
            articleId={article.id}
            teaserHtml={teaserHtml}
          />
        </div>
      </article>
    </div>
  );
}
