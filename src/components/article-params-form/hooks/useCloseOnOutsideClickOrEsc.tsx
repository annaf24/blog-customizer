import { useEffect } from 'react';

type UseCloseOnOutsideClickOrEscProps = {
	isOpen: boolean;
	rootRef: React.RefObject<HTMLElement>;
	onOutsideClick: () => void;
};

export const useCloseOnOutsideClickOrEsc = ({
	isOpen,
	rootRef,
	onOutsideClick,
}: UseCloseOnOutsideClickOrEscProps) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				onOutsideClick();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onOutsideClick();
			}
		};

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, rootRef, onOutsideClick]);
};
