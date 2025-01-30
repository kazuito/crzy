import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import {
  Color,
  ColorArea,
  ColorPicker,
  ColorSlider,
  ColorThumb,
  SliderTrack,
} from "react-aria-components";

type Props = {
  color: string | Color | undefined;
  setColor: (color: Color) => void;
  removeColor: () => void;
};

type ColorFormat =
  | "hex"
  | "rgb"
  | "hsl"
  | "hsb"
  | "hexa"
  | "rgba"
  | "hsla"
  | "hsba"
  | "css";
const formats: ColorFormat[] = ["hex", "rgb", "hsl"];

const MyColorPicker = ({ color, setColor, removeColor }: Props) => {
  const [format, setFormat] = useState("hex");
  return (
    <ColorPicker defaultValue={color} value={color} onChange={setColor}>
      <div className="flex w-full gap-4">
        <ColorArea
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
          className="grow h-40 cursor-crosshair rounded-xl"
        >
          <ColorThumb className="size-4 border-2 rounded-full" />
        </ColorArea>
        <ColorSlider
          colorSpace="hsb"
          orientation="vertical"
          className="shrink-0"
          channel="hue"
        >
          <SliderTrack className="h-40 w-10 rounded-xl cursor-pointer">
            <ColorThumb className="h-4 w-[110%] left-1/2 border-2 rounded-full" />
          </SliderTrack>
        </ColorSlider>
      </div>
      <div className="flex mt-4 gap-4">
        <div className="flex gap-2 grow">
          <Select
            defaultSelectedKeys={[format]}
            value={format}
            onChange={(e) => setFormat(e.target.value as ColorFormat)}
            className="w-40"
          >
            {formats.map((value) => (
              <SelectItem key={value} value={value}>
                {value.toUpperCase()}
              </SelectItem>
            ))}
          </Select>
          <Input
            value={color?.toString(format as ColorFormat)}
            isDisabled={true}
            className="grow"
          />
        </div>
        <Button isIconOnly color="danger" variant="flat" onPress={removeColor}>
          <Trash2Icon size={16} />
        </Button>
      </div>
    </ColorPicker>
  );
};

export default MyColorPicker;
