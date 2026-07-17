import AssessmentScaleLabels from "./AssessmentScaleLabels";

interface Props {
  value: number | undefined;
  onChange: (v: number) => void;
  scaleMin: string | null;
  scaleMax: string | null;
}

const SCALE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function AssessmentScaleButtons({ value, onChange, scaleMin, scaleMax }: Props) {
  return (
    <div className="pw-scale-wrap">
      <div className="pw-scale-buttons">
        {SCALE_VALUES.map((n) => (
          <button
            key={n}
            type="button"
            className={`pw-scale-btn${value === n ? " pw-scale-btn--active" : ""}`}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
      {(scaleMin || scaleMax) && <AssessmentScaleLabels scaleMin={scaleMin} scaleMax={scaleMax} />}
    </div>
  );
}
