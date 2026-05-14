import Icon from "../../components/Icon";

type Testimonial = { style: string; text: string; name: string };

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.style === "light") {
    return (
      <div className="testimonial-light">
        <div className="testimonial-avatar-placeholder"><Icon name="user" size={24} /></div>
        <div className="testimonial-body">
          <p className="testimonial-text">&ldquo;{testimonial.text}&rdquo;</p>
          <p className="testimonial-name">— {testimonial.name}</p>
        </div>
        <span className="testimonial-light-quote">&ldquo;</span>
      </div>
    );
  }
  return (
    <div className="testimonial-dark">
      <div className="testimonial-dark-body">
        {testimonial.text.split("\n\n").map((para, i) => (
          <p key={i} className="testimonial-dark-text">
            &ldquo;{para}&rdquo;
          </p>
        ))}
        <p className="testimonial-dark-name">— {testimonial.name}</p>
      </div>
      <div className="testimonial-dark-avatar-placeholder"><Icon name="user" size={24} /></div>
    </div>
  );
}
