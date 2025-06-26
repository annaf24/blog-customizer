import { useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectArticleState, setSelectArticleState] =
		useState(currentArticleState);
	const rootRef = useRef(null);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({ ...selectArticleState, [key]: value });
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: rootRef,
		onChange: () => setIsOpen(false),
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					ref={rootRef}
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setCurrentArticleState(selectArticleState);
					}}
					onReset={() => {
						setSelectArticleState(defaultArticleState);
						setCurrentArticleState(defaultArticleState);
					}}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						selected={selectArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						title='шрифт'
					/>
					<Select
						selected={selectArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => handleChange('fontSizeOption', option)}
						title='размер шрифта'
					/>
					<Select
						selected={selectArticleState.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
						title='цвет шрифта'
					/>
					<Select
						selected={selectArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
						title='цвет фона'
					/>
					<Select
						selected={selectArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
