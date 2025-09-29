import { useState, useRef } from "react";
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import GoodsForm from "../../components/GoodsForm/GoodsForm";

const CreateGoods = () => {
  const [good, setGood] = useState({
    imageurl: "",
    material: "",
    goodscarouselimages: [],
    parameter: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0,
    ],
    mainparameter: [0, 0, 0, 0, 0, 0, 0, 0],
    recommendparameter: [0, 0, 0, 0, 0, 0, 0, 0],
    article: "",
    advantages: [""],
    thickness: "",
    volume: "",
    pcs: "",
    basetype: "",
    color: "",
    heatresistance: "",
    name: "",
    description: "",
    type: "",
    size: "",
    brand: "",
    linertype: "",
    pdfurl: "",
    typeglue: "",
    dencity: "",
  });

  const form = useRef(0);

  return (
    <>
      <PanelHeader title="Создать товар" children={null} showBackBtn={false} />

      <GoodsForm
        good={good}
        setGood={setGood}
        buttonTitle="Созадать товар"
        form={form}
      ></GoodsForm>
    </>
  );
};

export default CreateGoods;
