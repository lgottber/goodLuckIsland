import { useState, KeyboardEvent } from "react";
import Modal from "../../components/Modal";
import Icon from "./Icon";
import BasicInfoTab from "./BasicInfoTab";
import LifeCareerTab from "./LifeCareerTab";
import RetirementTab from "./RetirementTab";
import FinancesTab from "./FinancesTab";
import ModalActionButton from "./ModalActionButton";
import type { ProfileForm } from "./types";

const MODAL_TABS = ["Basic Info", "Life & Career", "Retirement", "Finances"];

export default function EditModal({ user, onSave, onClose }: { user: ProfileForm; onSave: (form: ProfileForm) => void | Promise<void>; onClose: () => void }) {
  const [form, setForm] = useState<ProfileForm>({ ...user });
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [interestInput, setInterestInput] = useState("");

  const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const addInterest = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && interestInput.trim()) {
      e.preventDefault();
      if (!form.interests.includes(interestInput.trim())) {
        set("interests", [...form.interests, interestInput.trim()]);
      }
      setInterestInput("");
    }
  };
  const removeInterest = (tag: string) =>
    set(
      "interests",
      form.interests.filter((t: string) => t !== tag),
    );

  const tabIdx = MODAL_TABS.indexOf(activeTab);

  return (
    <Modal
      backdropClassName="edit-modal-backdrop"
      contentClassName="edit-modal"
      onClose={onClose}
    >
      {/* Header */}
      <div className="edit-modal-header">
        <div>
          <button type="button" className="edit-modal-close" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
        </div>
        <h2>Edit Islander Profile</h2>
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
      {activeTab === "Life & Career" && <LifeCareerTab form={form} set={set} />}
      {activeTab === "Retirement" && <RetirementTab form={form} set={set} />}
      {activeTab === "Finances" && <FinancesTab form={form} set={set} />}

      {/* Footer */}
      <div className="edit-modal-footer">
        <div className="modal-tab-nav">
          {tabIdx > 0 && (
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setActiveTab(MODAL_TABS[tabIdx - 1])}
            >
              Back
            </button>
          )}
        </div>
        <div className="modal-footer-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          {tabIdx < MODAL_TABS.length - 1 ? (
            <ModalActionButton
              label="Next →"
              onClick={() => setActiveTab(MODAL_TABS[tabIdx + 1])}
            />
          ) : (
            <ModalActionButton label="Save Changes" onClick={() => onSave(form)} />
          )}
        </div>
      </div>
    </Modal>
  );
}
