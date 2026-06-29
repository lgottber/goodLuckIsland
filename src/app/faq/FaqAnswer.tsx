interface Props {
  answer: string;
}

export default function FaqAnswer({ answer }: Props) {
  return (
    <div className="faq-answer">
      <p>{answer}</p>
    </div>
  );
}
