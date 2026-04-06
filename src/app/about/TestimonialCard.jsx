export default function TestimonialCard({ testimonial }) {
  if (testimonial.style === "light") {
    return (
      <div className="testimonial-light">
        <div className="testimonial-avatar-placeholder">🙂</div>
        <div className="testimonial-body">
          <p className="testimonial-text">"{testimonial.text}"</p>
          <p className="testimonial-name">— {testimonial.name}</p>
        </div>
        <span className="testimonial-light-quote">"</span>
      </div>
    );
  }
  return (
    <div className="testimonial-dark">
      <div className="testimonial-dark-body">
        {testimonial.text.split("\n\n").map((para, i) => (
          <p key={i} className="testimonial-dark-text">
            "{para}"
          </p>
        ))}
        <p className="testimonial-dark-name">— {testimonial.name}</p>
      </div>
      <div className="testimonial-dark-avatar-placeholder">
        🙂
      </div>
    </div>
  );
}
