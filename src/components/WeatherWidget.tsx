import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, CloudRain, Sun, CloudSnow, Cloud, Wind, Droplets, ThermometerSun, MapPin, AlertTriangle, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

// OpenWeather API key
const API_KEY = 'ea3fbddbdf3b9ae1769eb8e57ba66af8'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Predefined locations for the dropdown
const LOCATIONS = [
  // Major global cities
  "New York",
  "London",
  "Tokyo",
  "Sydney",
  "Paris",
  "Berlin",
  "Toronto",
  "Madrid",
  "Rome",
  "Amsterdam",
  // Taiwan cities
  "Taipei",
  "Kaohsiung",
  "Taichung",
  "Tainan",
  "Hsinchu",
  "Taoyuan"
];

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
  name: string;
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
  }[];
  dt_txt: string;
}

interface ForecastData {
  list: ForecastItem[];
}

const WeatherWidget: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastItem[] | null>(null);
  const [rainWarning, setRainWarning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('Taipei'); // Default to Taipei

  useEffect(() => {
    const fetchWeatherAndForecast = async () => {
      try {
        setLoading(true);
        // Fetch current weather
        const weatherResponse = await fetch(
          `${BASE_URL}?q=${location}&units=metric&appid=${API_KEY}`
        );
        
        if (!weatherResponse.ok) {
          const errorData = await weatherResponse.json();
          throw new Error(errorData.message || 'Weather data not available');
        }
        
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);
        
        // Fetch forecast data to check for rain later
        const forecastResponse = await fetch(
          `${FORECAST_URL}?q=${location}&units=metric&appid=${API_KEY}`
        );
        
        if (!forecastResponse.ok) {
          throw new Error('Forecast data not available');
        }
        
        const forecastData: ForecastData = await forecastResponse.json();
        
        // Process forecast data for 1-hour intervals
        // OpenWeather free API only provides 3-hour intervals
        // So we need to interpolate data to get 1-hour intervals
        const originalForecast = forecastData.list.slice(0, 8); // Get 24 hours of data (8 points at 3h intervals)
        const hourlyForecast: ForecastItem[] = [];
        
        // Interpolate data to get hourly forecast
        for (let i = 0; i < originalForecast.length - 1; i++) {
          const current = originalForecast[i];
          const next = originalForecast[i + 1];
          
          // Add the current 3-hour point
          hourlyForecast.push(current);
          
          // Create two interpolated hours between each 3-hour point
          for (let hour = 1; hour <= 2; hour++) {
            // Calculate interpolated timestamp
            const currentTime = new Date(current.dt_txt).getTime();
            const nextTime = new Date(next.dt_txt).getTime();
            const step = (nextTime - currentTime) / 3; // 3 hours difference
            const interpolatedTime = new Date(currentTime + (step * hour));
            
            // Calculate interpolated temperature (linear interpolation)
            const tempDiff = next.main.temp - current.main.temp;
            const interpolatedTemp = current.main.temp + (tempDiff * (hour / 3));
            
            // Create interpolated forecast item
            // We'll use the weather condition from the nearest 3-hour point for simplicity
            hourlyForecast.push({
              dt: Math.floor(interpolatedTime.getTime() / 1000),
              main: {
                temp: interpolatedTemp
              },
              weather: current.weather, // Using weather from the nearest 3-hour point
              dt_txt: interpolatedTime.toISOString()
            });
          }
        }
        
        // Add the last 3-hour point
        hourlyForecast.push(originalForecast[originalForecast.length - 1]);
        
        // Limit to 24 hours (24 points)
        const filteredForecast = hourlyForecast.slice(0, 24);
        setForecastData(filteredForecast);
        
        // Check if rain is expected in the next 24 hours
        const willRainLater = originalForecast.some(item => {
          const weatherId = item.weather[0].id;
          return (weatherId >= 200 && weatherId < 600); // Rain/storm codes
        });
        
        setRainWarning(willRainLater);
        setError(null);
        
        // Success toast
        toast.success('Weather Updated', {
          description: `Latest weather for ${weatherData.name}`,
        });
      } catch (err) {
        console.error('Error fetching weather:', err);
        const errorMessage = err instanceof Error ? err.message : 'Could not fetch weather data';
        setError(errorMessage);
        setWeatherData(null);
        setRainWarning(false);
        
        // Add a toast notification for the error
        toast.error('Weather Update Failed', {
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherAndForecast();
  }, [location]);

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
  };

  const getWeatherIcon = (weatherId: number) => {
    // Weather condition codes: https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 300) {
      return <CloudRain className="h-8 w-8 text-blue-500" />; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 400) {
      return <Droplets className="h-8 w-8 text-blue-300" />; // Drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
      return <CloudRain className="h-8 w-8 text-blue-500" />; // Rain
    } else if (weatherId >= 600 && weatherId < 700) {
      return <CloudSnow className="h-8 w-8 text-blue-200" />; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
      return <Wind className="h-8 w-8 text-gray-400" />; // Atmosphere
    } else if (weatherId === 800) {
      return <Sun className="h-8 w-8 text-yellow-500" />; // Clear
    } else if (weatherId > 800) {
      return <CloudSun className="h-8 w-8 text-gray-500" />; // Clouds
    }
    return <Cloud className="h-8 w-8 text-gray-400" />; // Default
  };

  const getWeatherCondition = (weatherId: number): string => {
    if (weatherId >= 200 && weatherId < 300) return "Not ideal for drying";
    if (weatherId >= 300 && weatherId < 600) return "Indoor drying recommended";
    if (weatherId >= 600 && weatherId < 700) return "Indoor drying recommended";
    if (weatherId === 800) return "Perfect for drying outside!";
    if (weatherId > 800 && weatherId < 804) return "Good for drying outside";
    return "Check conditions before drying outside";
  };

  // Format the time from the API response
  const formatTime = (dtTxt: string): string => {
    const date = new Date(dtTxt);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Weather & Drying Conditions</CardTitle>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
            <Select value={location} onValueChange={handleLocationChange}>
              <SelectTrigger className="w-[160px] h-8">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading && <p className="text-center py-4">Loading weather data...</p>}
        
        {error && <p className="text-destructive text-center py-4">{error}</p>}
        
        {weatherData && !loading && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getWeatherIcon(weatherData.weather[0].id)}
                <div>
                  <p className="font-medium">{weatherData.name}</p>
                  <p className="text-sm text-muted-foreground">{weatherData.weather[0].description}</p>
                </div>
              </div>
              <p className="text-2xl font-semibold">{Math.round(weatherData.main.temp)}°C</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{weatherData.main.humidity}% humidity</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{weatherData.wind.speed} m/s wind</span>
              </div>
            </div>
            
            {rainWarning && (
              <Alert variant="default" className="mt-2 bg-amber-50 border-amber-200 text-amber-800">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Rain Expected</AlertTitle>
                <AlertDescription>
                  Rain is forecasted later today. Consider indoor drying options.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="mt-3">
              <Badge 
                variant="outline" 
                className={
                  weatherData.weather[0].id === 800 
                    ? "bg-green-100 text-green-800" 
                    : weatherData.weather[0].id > 800 && weatherData.weather[0].id < 804
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                }
              >
                <ThermometerSun className="h-3 w-3 mr-1" /> 
                {getWeatherCondition(weatherData.weather[0].id)}
              </Badge>
            </div>
            
            {/* 1-Hour Forecast Section */}
            {forecastData && forecastData.length > 0 && (
              <>
                <Separator className="my-3" />
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    1-Hour Forecast
                  </h4>
                  <div className="overflow-x-auto">
                    <div className="flex gap-2 pb-2">
                      {forecastData.map((item, index) => (
                        <div 
                          key={index} 
                          className="flex flex-col items-center min-w-14 p-2 rounded-md bg-muted/30"
                        >
                          <span className="text-xs font-medium">{formatTime(item.dt_txt)}</span>
                          <div className="my-1">
                            {getWeatherIcon(item.weather[0].id)}
                          </div>
                          <span className="text-sm font-medium">{Math.round(item.main.temp)}°C</span>
                          <span className="text-xs text-muted-foreground truncate max-w-14 text-center">
                            {item.weather[0].description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
