// libs
import { useEffect, useState } from 'react';

// api
import { usePostTextMutation } from '../../Services/Api/module/langApi';

// styles
import './dashboard.css';

// constants
import CLASSNAME from '../../Shared/classname';
import TEXT from '../../Shared/text';

export default function Dashboard() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');

  const [postText, { isLoading, error }] = usePostTextMutation();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => clearTimeout(handler);
  }, [text]);

  useEffect(() => {
    const fetchTranslation = async () => {
      if (!debouncedText.trim()) {
        setTranslatedText('');
        return;
      }

      try {
        const response = await postText({
          text: debouncedText,
          outputFormat: 'hi',
        }).unwrap();
        setTranslatedText(
          response.translation || TEXT.MESSAGES.TRANSLATION_NOT_FOUND
        );
      } catch (err) {
        setTranslatedText(TEXT.MESSAGES.ERROR_FETCHING_TRANSLATION);
      }
    };

    fetchTranslation();
  }, [debouncedText, postText]);

  return (
    <div className={CLASSNAME.LAYOUT.WRAPPER}>
      <div className={CLASSNAME.LAYOUT.TEXT_WRAPPER}>
        <textarea
          value={text}
          placeholder={TEXT.PLACEHOLDER.ENTER_TEXT_TO_TRANSLATE}
          className={CLASSNAME.LAYOUT.TEXT_AREA}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setText((prev) => prev.replace(/\s+/g, ' ').trim())}
        />
        <div className={CLASSNAME.LAYOUT.TEXT_LENGTH}>{text.length}</div>
      </div>

      <div className={CLASSNAME.LAYOUT.TRANSLATED_TEXT_WRAPPER}>
        <textarea
          readOnly
          value={isLoading ? TEXT.MESSAGES.TRANSLATING : translatedText}
          className={CLASSNAME.LAYOUT.TRANSLATED_TEXT}
        />
      </div>

      {Boolean(error) && (
        <div className={CLASSNAME.LAYOUT.ERROR_FETCHING}>
          {TEXT.MESSAGES.ERROR_IN_TRANSLATION}
        </div>
      )}
    </div>
  );
}
