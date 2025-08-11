import CloseIcon from "./CloseIcon";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-3 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="w-full flex justify-end">
          <div className="w-7 h-7"></div>
          <h2 className="justify-center">{title}</h2>
          <button
            className="w-7 h-7 cursor-pointer rounded-full"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}
