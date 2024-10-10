import { useState } from "react";
import { Record } from "../types/weather";
import { getWeather } from "../apis/weather";

const getLocalRecord = () =>
  JSON.parse(localStorage.getItem("weather") as string) ?? [];

const useWeather = () => {
  const [record, setRecord] = useState<Record[]>(getLocalRecord);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(
    record[0] ?? null
  );
  const [error, setError] = useState("");

  const handleStoreRecord = (newRecord: Record[]) => {
    setRecord(newRecord);
    localStorage.setItem("weather", JSON.stringify(newRecord));
  };

  const handleAddRecord = (newRecord: Record) => {
    const isExistingRecord = record.find((item) => item.id === newRecord.id);

    let newRecords = [];
    if (isExistingRecord) {
      newRecords = record.reduce((acc, item) => {
        if (item.id === newRecord.id) {
          return acc.concat(newRecord);
        }
        return acc.concat(item);
      }, [] as Record[]);
    } else newRecords = [newRecord, ...record];

    handleStoreRecord(newRecords);
  };

  const handleSearchWeather = async (text: string) => {
    try {
      setLoading(true);
      setError("");
      const res = await getWeather(text);

      if (res && res.count) {
        const newRecord = {
          ...res.list[0],
          recordTime: new Date().toLocaleTimeString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        handleAddRecord(newRecord);
        setSelectedRecord(newRecord);
      } else {
        setError(
          "Not found. To make search more precise put the name of city, comma, 2-letter country code (ISO3166)."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecord = async (data: Record) => {
    await handleSearchWeather(data.name);
  };

  const handleRemoveRecord = (id: number) => {
    if (selectedRecord?.id === id) {
      setSelectedRecord(null);
    }
    const newRecord = [...record].filter((item) => item.id !== id);
    handleStoreRecord(newRecord);
  };

  return {
    loading,
    error,
    record,
    selectedRecord,
    handleSearchWeather,
    handleSelectRecord,
    handleRemoveRecord,
  };
};

export default useWeather;
