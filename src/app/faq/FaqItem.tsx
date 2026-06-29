import Icon from "../../components/Icon";
import FaqAnswer from "./FaqAnswer";

interface Props {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FaqItem({ question, answer, isOpen, onToggle }: Props) {
  return (
    <div className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
      <button
        type="button"
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className="faq-icon">
          <Icon name={isOpen ? "minus" : "plus"} size={16} />
        </span>
      </button>
      {isOpen && <FaqAnswer answer={answer} />}
    </div>
  );
}
