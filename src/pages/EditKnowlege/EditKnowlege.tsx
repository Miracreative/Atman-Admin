import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fileImage from "../../assets/icons/file.svg";
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";

import { getOneKnowlege, deleteKnowlege } from "../../hooks/http.hook";

import "./_editKnowlege.scss";

import {
  BoldItalicUnderlineToggles,
  MDXEditor,
  MDXEditorMethods,
  UndoRedo,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  frontmatterPlugin,
  InsertFrontmatter,
  InsertTable,
  ListsToggle,
  Separator,
  CreateLink,
  BlockTypeSelect,
  linkPlugin,
  linkDialogPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import ReactMarkdown from "react-markdown";

const EditKnowlege = () => {
  const form = useRef<any>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [textAlert, setTextAlert] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [del, setDel] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const mkdStr = ``;
  const [value, setValue] = useState(mkdStr);
  const ref = useRef<MDXEditorMethods>(null);
  const [oldText, setOldText] = useState<string>("");
  const [targetConfirm, setTargetConfirm] = useState({
    id: 0,
    title: "",
  });

  const [knowledge, setKnowledge] = useState({
    id: 0,
    title: "",
    content: "",
    file: "",
    file_name: "",
  });

  const validateValues = (inputName: string, inputValue: string) => {
    let error = {
      title: "",
      content: "",
      file: "",
    };

    switch (inputName) {
      case "title":
        if (inputValue.length < 2) {
          error.title = "Название слишком короткое";
        } else {
          error.title = "";
        }
        break;
      case "content":
        if (inputValue.length < 10) {
          error.content = "Текста слишком мало";
        } else {
          error.content = "";
        }
        break;
      default:
        console.error("Неизвестное поле");
    }

    return error;
  };

  //отправляем запрос получния данных об админе
  useEffect(() => {
    getOneKnowlege(id).then((res) => {
      setKnowledge(res);
      setOldText(res.content);
    });
  }, []);

  const checkForm = () => {
    if (knowledge.title && knowledge.content) {
      for (let key in errors) {
        if (errors[key] !== "") {
          return true;
        }
      }
      return false;
    }
    return true;
  };
  //обработчик текстовых инпутов
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setKnowledge((state: any) => ({ ...state, [name]: value }));
    setErrors((state: any) => ({
      ...state,
      ...validateValues(e.target.name, e.target.value),
    }));
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target.form);
    formData.append("id", `${knowledge.id}`);
    if (knowledge.content.length > 0) {
      formData.append("content", `${knowledge.content}`);
    } else {
      formData.append("content", `${oldText}`);
    }
    axios
      .put("https://api.atman-auto.ru/api/base", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(() => {
        setLoading(false);
        setShowAlert(true);
        setTextAlert("База была успешно обновлена");
      })
      .catch(() => {
        setLoading(false);
        setShowAlert(true);
        setTextAlert("Что-то пошло не так");
      })
      .finally(() => {
        setLoading(false);
        setShowAlert(true);
      });
  };

  const removeKnowlege = (id: number) => {
    setShowConfirm(false);
    deleteKnowlege(id);
    setDel(true);
    setShowAlert(true);
    setTextAlert("База успешно удалена");
  };
  // показываем окно подтверждения
  const onConfirmDelete = (id: number, title: string) => {
    setShowConfirm(true);
    setTargetConfirm({ id, title });
  };

  const changeContent = (e: any) => {
    setValue(value);
    setKnowledge((state: any) => ({ ...state, content: e }));
  };

  const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;

  let spinner = loading ? <Spinner active /> : null;

  return (
    <>
      <PanelHeader
        title="Редактировать базу"
        children={null}
        showBackBtn={true}
      />
      {spinner}
      <form
        className="create-knowlege"
        id="create-knowlege"
        ref={form}
        acceptCharset="utf-8"
      >
        <div className="create-knowlege__box">
          <label className="create-knowlege__label">
            <span>Название базы знаний</span>
            <input
              className={`input ${errors.title ? "input--error" : ""}`}
              type="text"
              name="title"
              value={knowledge.title}
              onChange={handleChange}
            />
            <div className="error">{errors.title}</div>
          </label>
          <label className="create-knowlege__label">
            <span>Содержание базы</span>
            {/* <textarea className={`input input--textarea ${errors.content ? 'input--error' : ''}`} 
                    name="content"
                    value={knowledge.content}
                    onChange={handleChange}/>
                    <div className='error'>{errors.content}</div> */}
            <div className="create-knowlege__text">
              <ReactMarkdown>{oldText}</ReactMarkdown>
            </div>
          </label>
          <label className="create-knowlege__label">
            <span>Перепишите текст новости, если это необходимо</span>
            {/* <textarea className={`input input--textarea ${errors.content ? 'input--error' : ''}`} 
                    name="content"
                    value={news.content}
                    onChange={handleChange}/>
                    <div className='error'>{errors.content}</div> */}
          </label>
          <MDXEditor
            ref={ref}
            onChange={changeContent}
            markdown=""
            plugins={[
              toolbarPlugin({
                toolbarClassName: "my-classname",
                toolbarContents: () => (
                  <>
                    <BlockTypeSelect />
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                    <InsertFrontmatter />
                    <ListsToggle />
                    <CreateLink />
                  </>
                ),
              }),
              headingsPlugin(),
              listsPlugin(),
              // quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
              frontmatterPlugin(),
              linkPlugin(),
              linkDialogPlugin(),
            ]}
          />
          <label className="create-knowlege__label create-knowlege__input">
            <span>Загрузите файл</span>
            <input
              className=""
              type="file"
              name="file"
              id="file"
              onChange={handleChange}
            />
            <img src={fileImage} alt="file_image" />
            <span>
              {knowledge.file
                ? knowledge.file.replace(regular, "")
                : "Файл не выбран"}
            </span>
          </label>
        </div>
        <div className="create-knowlege__btns">
          <button
            type="button"
            className="create-knowlege__btn button button--orange"
            onClick={() => onConfirmDelete(knowledge.id, knowledge.title)}
          >
            Удалить базу
          </button>
          <button
            type="button"
            className="create-knowlege__btn button"
            disabled={checkForm()}
            onClick={(e) => {
              submitForm(e);
            }}
          >
            Обновить базу
          </button>
        </div>
      </form>
      <ConfirmModal
        question="Удалить базу?"
        text1={targetConfirm.title}
        text2={""}
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        actionConfirmed={() => removeKnowlege(targetConfirm.id)}
      />
      <ModalAlert
        alertBtnOpacity={false}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={textAlert}
        alertConfirm={() =>
          del ? navigate("/knowledge-list") : console.log("edit")
        }
      />
    </>
  );
};

export default EditKnowlege;
