import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "../../../lib/db.server";
import NavBarDynamic from "../../../components/NavBarDynamic";
import PictureImage from "../../../components/PictureImage";
import "./article-detail.css";

export const runtime = "edge";

interface ArticleRow {
  id: number;
  category: string;
  title: string;
  excerpt: string | null;
  date: string | null;
  read_time: string | null;
  image: string | null;
}

const fetchArticle = cache(async (id: number): Promise<ArticleRow | null> => {
  const db = getDb();
  return db
    .prepare("SELECT id, category, title, excerpt, date, read_time, image FROM articles WHERE id = ?")
    .bind(id)
    .first<ArticleRow>();
});

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) return {};
  const article = await fetchArticle(numId);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.image ? [{ url: article.image }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) notFound();
  const article = await fetchArticle(numId);
  if (!article) notFound();

  const heroImage = article.image ? (
    <div className="content-detail-hero">
      <PictureImage
        name={article.image}
        alt={`Cover image for: ${article.title}`}
        className="content-detail-img"
      />
    </div>
  ) : null;

  const excerpt = article.excerpt ? (
    <p className="content-detail-excerpt">{article.excerpt}</p>
  ) : null;

  return (
    <>
      <NavBarDynamic activePage="articles" />
      <div className="content-detail-page">
        <div className="content-detail-back">
          <Link href="/articles" className="content-detail-back-link">
            ← Back to Articles
          </Link>
        </div>

        {heroImage}

        <div className="content-detail-body">
          <span className="content-detail-tag">{article.category}</span>
          <h1 className="content-detail-title">{article.title}</h1>
          <div className="content-detail-meta">
            {article.date && <span>{article.date}</span>}
            {article.date && article.read_time && <span className="content-detail-dot" />}
            {article.read_time && <span>{article.read_time}</span>}
          </div>
          {excerpt}
          <Link href="/articles" className="content-detail-cta">
            Browse all articles →
          </Link>
        </div>
      </div>
    </>
  );
}
