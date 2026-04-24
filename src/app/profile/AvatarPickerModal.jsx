import { useState } from "react";
import Modal from "../../components/Modal";
import Icon from "./Icon";
import AvatarEraTab from "./AvatarEraTab";
import AvatarCharacterButton from "./AvatarCharacterButton";
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
          <p className="avatar-modal-subtitle">
            Pick an iconic character from your era
          </p>
        </div>
        <button type="button" className="edit-modal-close" onClick={onClose}>
          <Icon name="x" size={18} />
        </button>
      </div>

      <div className="avatar-era-tabs">
        {AVATAR_ERAS.map((e) => (
          <AvatarEraTab
            key={e.era}
            era={e}
            active={selectedEra === e.era}
            onSelect={setSelectedEra}
          />
        ))}
      </div>

      <div className="avatar-grid-wrap">
        <div className="avatar-grid">
          {era.characters.map((char) => (
            <AvatarCharacterButton
              key={char.id}
              char={char}
              isSelected={currentAvatar === char.id}
              onSelect={(id) => {
                onSelect(id);
                onClose();
              }}
            />
          ))}
        </div>
      </div>

      <div className="edit-modal-footer avatar-picker-footer">
        <p className="avatar-picker-hint">
          Click a character to select them as your avatar
        </p>
        <button type="button" className="btn-cancel" onClick={onClose}>
          Done
        </button>
      </div>
    </Modal>
  );
}
