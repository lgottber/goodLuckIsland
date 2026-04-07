import { useState } from "react";
import Modal from "../../components/Modal";
import Icon from "./Icon";
import { AVATAR_ERAS } from "./AvatarDisplay";

export default function AvatarPickerModal(
  { currentAvatar, onSelect, onClose },
) {
  const [selectedEra, setSelectedEra] = useState("80s");
  const era = AVATAR_ERAS.find((e) => e.era === selectedEra);

  return (
    <Modal
      backdropClassName="edit-modal-backdrop"
      contentClassName="edit-modal avatar-picker-modal"
      onClose={onClose}
    >
      <div className="edit-modal-header">
        <div>
          <h2>Choose Your Islander Avatar</h2>
          <p
            style={{
              fontSize: "0.78rem",
              color: "var(--muted)",
              marginTop: "0.25rem",
            }}
          >
            Pick an iconic character from your era
          </p>
        </div>
        <button type="button" className="edit-modal-close" onClick={onClose}>
          <Icon name="x" size={18} />
        </button>
      </div>

      <div className="avatar-era-tabs">
        {AVATAR_ERAS.map((e) => (
          <button
            type="button"
            key={e.era}
            className={`avatar-era-tab ${
              selectedEra === e.era ? "active" : ""
            }`}
            onClick={() => setSelectedEra(e.era)}
          >
            <span className="era-decade">{e.era}</span>
            <span className="era-label">{e.label}</span>
          </button>
        ))}
      </div>

      <div className="avatar-grid-wrap">
        <div className="avatar-grid">
          {era.characters.map((char) => {
            const isSelected = currentAvatar === char.id;
            return (
              <button
                type="button"
                key={char.id}
                className={`avatar-character-btn ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => {
                  onSelect(char.id);
                  onClose();
                }}
              >
                <div
                  className="avatar-character-face"
                  style={{ background: char.bg }}
                >
                  <span className="avatar-emoji">{char.emoji}</span>
                  {isSelected && <div className="avatar-selected-check">✓</div>}
                </div>
                <span className="avatar-character-name">{char.name}</span>
                <span className="avatar-character-show">{char.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="edit-modal-footer"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
          Click a character to select them as your avatar
        </p>
        <button type="button" className="btn-cancel" onClick={onClose}>
          Done
        </button>
      </div>
    </Modal>
  );
}
