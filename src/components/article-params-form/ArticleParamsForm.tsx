import React, { useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
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
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useCloseOnOutsideClickOrEsc } from './hooks/useCloseOnOutsideClickOrEsc';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsisSidebarOpenOpen] = useState(false);
	const [selectArticleState, setSelectArticleState] =
		useState(currentArticleState);
	const rootRef = useRef(null);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({ ...selectArticleState, [key]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentArticleState(selectArticleState);
	};

	const handleReset = () => {
		setSelectArticleState(defaultArticleState);
		setCurrentArticleState(defaultArticleState);
	};

	useCloseOnOutsideClickOrEsc({
		isOpen: isSidebarOpen,
		rootRef: rootRef,
		onOutsideClick: () => setIsisSidebarOpenOpen(false),
	});

	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => setIsisSidebarOpenOpen(!isSidebarOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					ref={rootRef}
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						selected={selectArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						title='шрифт'
					/>
					<RadioGroup
						name={'размер шрифта'}
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
					<Separator />
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
