"use client";
import { useEffect, useRef, useState } from "react";
import {
  deleteTodo,
  fetchTodoDetail,
  updateTodo,
  uploadImage,
} from "../../api/swagger";
import { useParams } from "next/navigation";
import {
  checked,
  memo,
  noimage,
  photoeditbtn,
  plusbtn,
  uncheck,
} from "@/app/images/img";
import DeleteButton from "@/app/components/DeleteButton";
import UpdateButton from "@/app/components/UpdateButton";
import Header from "@/app/components/Header";
import loading from "@/app/images/loading.gif";

export interface Todo {
  id: string;
  name: string;
  isCompleted: boolean;
  memo: string | null;
  imageUrl: string | null;
  tenantId: string;
}

const TodoDetail = () => {
  const params = useParams();
  const itemId = params.itemId as string;
  const [item, setItem] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [text, setText] = useState<string>((item && item.memo) || "");
  const imageUrl = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadTodo = async () => {
    setLoading(true);
    try {
      const data = await fetchTodoDetail(itemId);
      setItem(data);
      setText(data.memo || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${height}px`;
      if (textareaRef.current.scrollHeight >= 220) {
        textareaRef.current.style.height = `220px`;
      } else {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (
    id: string,
    updatedData: Partial<Todo>,
    imageFile?: File
  ) => {
    try {
      let imageUrl = updatedData.imageUrl || "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      const { id: _, tenantId: __, ...validData } = updatedData;
      const updatedTodo = await updateTodo(id, { ...validData, imageUrl });
      setItem(updatedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const clickTextHandler = () => {
    setIsEditing(!isEditing);
    if (paragraphRef.current) {
      const heightValue = paragraphRef.current.offsetHeight;
      setHeight(heightValue);
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [height]);

  useEffect(() => {
    console.log(item && item.imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    if (itemId) loadTodo();
  }, [itemId]);

  if (!item) return !loading;

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imageUrl = await uploadImage(file);
      if (item) {
        const updatedData = { ...item, imageUrl };
        await handleUpdate(item.id, updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const textareaElement = (
    <textarea
      ref={textareaRef}
      className="bg-transparent w-full resize-none absolute left-0 text-black text-start overflow-y-auto text-wrap z-10"
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        adjustHeight();
      }}
      onInput={adjustHeight}
    />
  );
  return (
    <>
      {loading ? (
        <div className="relative z-10 w-screen h-screen bg-white bg-opacity-5 flex justify-center items-center">
          {loading}
        </div>
      ) : null}
      <Header />
      <div
        className="detailContainer bg-white m-auto w-4/5"
        style={{
          padding: "28px 5%",
        }}
      >
        <div
          style={{
            lineHeight: "4rem",
            border: "2px solid black",
            background: item.isCompleted ? "#ede9fe" : "#fff",
          }}
          className="flex justify-center items-center gap-4 border-black w-full h-16 text-2xl rounded-3xl text-center leading-9"
        >
          {item.isCompleted ? checked : uncheck}
          <h2 className="underline">{item.name}</h2>
        </div>
        <div className="memoImageContainer flex my-7 gap-7">
          <div
            className={`imageBox relative overflow-hidden rounded-3xl w-5/12 flex justify-center items-center`}
            style={{
              background: "#f8fafc",
              border: item.imageUrl === null ? "dashed 2px #cbd5e1" : "",
            }}
          >
            <div className="absolute w-full h-full flex justify-center items-center">
              {item.imageUrl ? (
                <img
                  className="w-full h-full object-cover"
                  src={item.imageUrl}
                  alt="Uploaded"
                />
              ) : (
                noimage
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-4 right-4"
            >
              {item.imageUrl ? photoeditbtn : plusbtn}
              <input
                className="hidden"
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
              />
            </button>
          </div>
          <div
            className="memoBox relative rounded-3xl overflow-hidden w-7/12"
            style={{ height: "311px" }}
          >
            {memo}
            <div
              className="absolute flex flex-col justify-between text-center w-11/12 h-5/6"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <h2
                className="font-bold text-lg mb-4"
                style={{ color: "#92400e" }}
              >
                Memo
              </h2>
              <div className="flex items-center h-full">
                {isEditing ? (
                  text.length === 0 ? (
                    textareaElement
                  ) : (
                    <p
                      ref={paragraphRef}
                      onClick={clickTextHandler}
                      style={{ maxHeight: "220px" }}
                      className="bg-transparent w-full h-fit absolute left-0 text-black text-start overflow-y-auto text-wrap z-10"
                    >
                      {text}
                    </p>
                  )
                ) : (
                  textareaElement
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="detailBtnsBox flex gap-2 justify-end">
          <UpdateButton
            todo={item}
            onUpdate={handleUpdate}
            memo={text}
            isCompleted={item.isCompleted}
            updateType="memo"
          />
          <DeleteButton todoId={item.id} onDelete={handleDelete} />
        </div>
      </div>
    </>
  );
};

export default TodoDetail;
