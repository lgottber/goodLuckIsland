import { useState } from "react";
import Modal from "../../components/Modal";
import Icon from "./Icon";
import BasicInfoTab from "./BasicInfoTab";
import LifeCareerTab from "./LifeCareerTab";
import RetirementTab from "./RetirementTab";
import FinancesTab from "./FinancesTab";
import ModalNextButton from "./ModalNextButton";
import ModalSaveButton from "./ModalSaveButton";

const MODAL_TABS = ["Basic Info", "Life & Career", "Retirement", "Finances"];

export default function EditModal({ user, onSave, onClose }) {
  const [form, setForm] = useState({ ...user });
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [interestInput, setInterestInput] = useState("");

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const addInterest = (e) => {
    if (e.key === "Enter" && interestInput.trim()) {
      e.preventDefault();
      if (!form.interests.includes(interestInput.trim())) {
        set("interests", [...form.interests, interestInput.trim()]);
      }
      setInterestInput("");
    }
  };
  const removeInterest = (tag) =>
    set("interests", form.interests.filter((t) => t !== tag));

  const tabIdx = MODAL_TABS.indexOf(activeTab);

  return (
    <Modal backdropClassName="edit-modal-backdrop" contentClassName="edit-modal" onClose={onClose}>
      {/* Header */}
      <div className="edit-modal-header">
        <h2>Edit Islander Profile</h2>
        <button type="button" className="edit-modal-close" onClick={onClose}>
          <Icon name="x" size={18} />
        </button>
      </div>

      {/* Tab bar */}
      <div className="modal-tab-bar">
        {MODAL_TABS.map((t) => (
          <button
            type="button"
            key={t}
            className={`modal-tab-btn ${activeTab === t ? "active" : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Basic Info" && (
        <BasicInfoTab
          form={form}
          set={set}
          interestInput={interestInput}
          setInterestInput={setInterestInput}
          addInterest={addInterest}
          removeInterest={removeInterest}
        />
      )}
      {activeTab === "Life & Career" && (
        <LifeCareerTab form={form} set={set} />
      )}
      {activeTab === "Retirement" && (
        <RetirementTab form={form} set={set} />
      )}
      {activeTab === "Finances" && (
        <FinancesTab form={form} set={set} />
      )}

      {/* Footer */}
      <div className="edit-modal-footer">
        <div className="modal-tab-nav">
          {tabIdx > 0 && (
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setActiveTab(MODAL_TABS[tabIdx - 1])}
            >
              ← Back
            </button>
          )}
        </div>
        <div className="modal-footer-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          {tabIdx < MODAL_TABS.length - 1
            ? <ModalNextButton onNext={() => setActiveTab(MODAL_TABS[tabIdx + 1])} />
            : <ModalSaveButton onSave={() => onSave(form)} />}
        </div>
      </div>
    </Modal>
  );
}
