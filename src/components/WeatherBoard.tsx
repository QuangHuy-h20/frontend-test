import { useTheme } from "../contexts/ThemeContext";
import useWeather from "../hooks/useWeather";
import RecordItem from "./RecordItem";
import SearchBar from "./SearchBar";
import ThemeToggleButton from "./ThemeToggleButton";

const WeatherBoard = () => {
  const {
    record,
    selectedRecord,
    error,
    loading,
    handleSearchWeather,
    handleRemoveRecord,
    handleSelectRecord,
  } = useWeather();

  const { isDarkMode } = useTheme();

  return (
    <div className="container">
      <div className="header">
        <div className="search-wrapper">
          <SearchBar onSearch={handleSearchWeather} />
        </div>
        <ThemeToggleButton />
      </div>
      <div className="description">
        <span>{loading ? "Loading..." : error ?? ""}</span>
      </div>
      <div className="card">
        <div className="weather-info">
          <img
            className="weather-image"
            src={`/${isDarkMode ? "cloud" : "sun"}.png`}
          />
          <div className="general-info">
            <span>Today’s Weather</span>
            <span className="degree">
              {`${
                selectedRecord ? selectedRecord?.main.temp.toFixed(0) : "--"
              }°`}
            </span>
            <span>
              {`H: ${
                selectedRecord ? selectedRecord?.main.temp_max.toFixed(0) : "--"
              }° L: ${
                selectedRecord ? selectedRecord?.main.temp_min.toFixed(0) : "--"
              }°`}
            </span>
            {!!selectedRecord && (
              <div className="detail-info">
                <span>{selectedRecord.name}</span>
                <span>{selectedRecord.weather[0].description}</span>
                <span>{`Humidity: ${selectedRecord.main.humidity}%`}</span>
                <span>{selectedRecord.recordTime}</span>
              </div>
            )}
          </div>
          {!!selectedRecord && (
            <div className="detail-info-mobile">
              <span>{selectedRecord.weather[0].description}</span>
              <span>{`Humidity: ${selectedRecord.main.humidity}%`}</span>
              <span>{selectedRecord.recordTime}</span>
            </div>
          )}
        </div>
        {!!record.length && (
          <div className="search-history">
            <h3>Search History</h3>
            <ul className="record-list">
              {record.map((item) => (
                <RecordItem
                  key={item.id}
                  item={item}
                  disabled={loading}
                  onSelect={() => handleSelectRecord(item)}
                  onRemove={() => handleRemoveRecord(item.id)}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherBoard;
