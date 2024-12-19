import React, { Dispatch, SetStateAction, useRef } from "react";
import { useHeight } from "./HeightContext";
type AdjustableTextareaProps = {
  text: string
  setText: Dispatch<SetStateAction<string>>
}
const AdjustableTextarea = ({text, setText}:AdjustableTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { height, setHeight } = useHeight();
  const adjustHeight = () => {
    if (textareaRef.current) {
      const newHeight = Math.min(textareaRef.current.scrollHeight, 306); // 최대 높이 제한
      setHeight(newHeight); // 컨텍스트 상태에 저장
      textareaRef.current.style.height = `${newHeight}px`; // 스타일 적용
    }
  };
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${height}px`; // 저장된 높이 복원
    }
  }, [height]);
  return (
    <textarea
      ref={textareaRef}
      className="bg-transparent w-full absolute left-0 text-black text-start overflow-y-scroll text-wrap z-10"
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        adjustHeight();
      }}
      style={{ height: `${height}px` }} // 상태 기반 높이 설정
    />
  );
};
export default AdjustableTextarea;
