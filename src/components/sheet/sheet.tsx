"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";

// Types
interface SheetContextType {
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface SheetTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

interface SheetContentProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  className?: string;
}

interface SheetHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface SheetFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface SheetTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface SheetDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

// Context
const SheetContext = createContext<SheetContextType | undefined>(undefined);

const useSheetContext = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet components must be used within a Sheet provider");
  }
  return context;
};

// Root Sheet Component
export const Sheet: React.FC<SheetProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const openSheet = useCallback(() => {
    if (!isControlled) setInternalOpen(true);
    onOpenChange?.(true);
  }, [isControlled, onOpenChange]);

  const closeSheet = useCallback(() => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  return (
    <SheetContext.Provider value={{ isOpen, openSheet, closeSheet }}>
      {children}
    </SheetContext.Provider>
  );
};

// Trigger Component
export const SheetTrigger: React.FC<SheetTriggerProps> = ({
  children,
  className = "",
}) => {
  const { openSheet } = useSheetContext();

  if (typeof children === "string") {
    return (
      <button onClick={openSheet} className={className} type="button">
        {children}
      </button>
    );
  }
  const element = children as React.ReactElement<{
    onClick?: (e: React.MouseEvent) => void;
  }>;

  return React.cloneElement(element, {
    onClick: (e: React.MouseEvent) => {
      openSheet();
      element.props.onClick?.(e); // Access the original onClick from the asserted element
    },
  });
};

// Content Component
export const SheetContent: React.FC<SheetContentProps> = ({
  children,
  side = "right",
  className = "",
}) => {
  const { isOpen, closeSheet } = useSheetContext();
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSheet();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeSheet]);

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      return () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    }
  }, [isOpen]);

  // Get side-specific styles
  const getSideStyles = () => {
    const baseStyles =
      "fixed z-50 gap-4 bg-white p-4 shadow-lg transition-all duration-300 ease-in-out";

    switch (side) {
      case "left":
        return `${baseStyles} left-0 top-0 h-full w-3/4 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-full max-w-md`;

      case "right":
        return `${baseStyles} right-0 top-0 h-full w-3/4 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-full max-w-md`;

      case "top":
        return `${baseStyles} left-0 top-0 w-full ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } max-h-1/2`;

      case "bottom":
        return `${baseStyles} left-0 bottom-0 w-full ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } max-h-1/2`;

      default:
        return baseStyles;
    }
  };

  return (
    <>
      {/* Overlay/Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur transition-opacity duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSheet}
        aria-hidden="true"
      />

      {/* Sheet Content */}
      <div
        ref={contentRef}
        className={`${getSideStyles()} ${className}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={closeSheet}
          className="absolute right-4 top-4 inline-flex size-7 items-center justify-center rounded-md bg-zinc-100 hover:bg-zinc-200 transition-colors"
          aria-label="Close"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 6l-12 12M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </>
  );
};

// Header Component
export const SheetHeader: React.FC<SheetHeaderProps> = ({
  children,
  className = "",
}) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
  >
    {children}
  </div>
);

// Footer Component
export const SheetFooter: React.FC<SheetFooterProps> = ({
  children,
  className = "",
}) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
  >
    {children}
  </div>
);

// Title Component
export const SheetTitle: React.FC<SheetTitleProps> = ({
  children,
  className = "",
}) => (
  <h2
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h2>
);

// Description Component
export const SheetDescription: React.FC<SheetDescriptionProps> = ({
  children,
  className = "",
}) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

// Close Component
export const SheetClose: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const { closeSheet } = useSheetContext();

  return (
    <button onClick={closeSheet} className={className} type="button">
      {children}
    </button>
  );
};
