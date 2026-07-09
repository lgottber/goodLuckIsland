import PictureImage from "../../components/PictureImage";
import TestimonialCard from "./TestimonialCard";
import type { ApprovedTestimonial } from "../../lib/testimonialsApi";

export default function StoriesSection({ testimonials }: { testimonials: ApprovedTestimonial[] }) {
  return (
    <div className="stories-section">
      <PictureImage
        className="stories-hero-img"
        name="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1400&q=70"
        alt="Lush forest landscape with sunlight filtering through tall trees, representing positive life stories"
        sizes="100vw"
      />
      <div className="stories-inner">
        <h2 className="stories-title">Positive Stories</h2>
        {testimonials.map((t, i) => (
          <TestimonialCard
            key={t.id}
            testimonial={{
              style: i % 2 === 0 ? "light" : "dark",
              text: t.content,
              name: t.name,
            }}
          />
        ))}
      </div>
    </div>
  );
}
