import { defineStore } from "pinia";

export const useResultStore = defineStore("resultStore", () => {
  const showing = ref(false);
  const resultContent = ref("");
  const fileName = ref("");

  const setData = (data: string) => {
    resultContent.value = data;
  };

  const setName = (name: string) => {
    fileName.value = name;
  };

  const show = () => {
    showing.value = true;
  };

  const hide = () => {
    showing.value = false;
  };

  return { showing, resultContent, fileName, setName, setData, show, hide };
});
