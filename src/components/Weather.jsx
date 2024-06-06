import { useEffect, useRef, useState } from "react";
import { Card, CardContent, TextField, IconButton, Typography, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '../assets/clear.png';
import HumidityIcon from '../assets/humidity.png';
import WindIcon from '../assets/wind.png';
import DrizzleIcon from '../assets/drizzle.png';
import RainIcon from '../assets/rain.png';
import SnowIcon from '../assets/snow.png';
import CloudIcon from '../assets/cloud.png';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Weather = () => {
    const inputRef = useRef(null);
    const [weather, setWeather] = useState(null);

    // Icons for different weather conditions from asset folder
    const icons = {
        "01d": ClearIcon,
        "01n": ClearIcon,
        "02d": CloudIcon,
        "02n": CloudIcon,
        "03d": CloudIcon,
        "03n": CloudIcon,
        "04d": DrizzleIcon,
        "04n": DrizzleIcon,
        "09d": RainIcon,
        "09n": RainIcon,
        "10d": RainIcon,
        "10n": RainIcon,
        "13d": SnowIcon,
        "13n": SnowIcon
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_URL}`;

            const response = await axios.get(url);
            console.log(response.data);
            if (response.status !== 200) {
                throw new Error('City not found');
                
            }
            const useIcon = icons[response.data.weather[0].icon] || ClearIcon;

            // Set the weather state with the data from the API
            setWeather({
                humidity: response.data.main.humidity,
                windSpeed: response.data.wind.speed,
                temperature: Math.floor(response.data.main.temp),
                location: response.data.name,
                icon: useIcon,
  
            });
        } catch (err) {
            console.log(err);
            toast.error("Please enter a valid city name.");
        }
    };

    // Call the search function when the component is mounted or rendered

    // useEffect(() => {
    //     search();
    // }, []);

    // Function to handle the search button click
    const handleSearch = () => {
        const searchTerm=inputRef.current.value;
        if (!searchTerm) {
            setWeather(null);
            toast.warning("Please enter a city name.");
            return;
        }
        search(searchTerm);
    };

    // Function to handle the Enter key press
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const searchTerm=inputRef.current.value;
            if (!searchTerm) {
                toast.warning("Please enter a city name.");
                return;
            }
            search(searchTerm);
        }
    };

    return (
        <Card sx={{backgroundColor:'#EEEEEE', width: 400, margin: 'auto', mt: 4 }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                    Weather Finder
                </Typography>
                <Card sx={{ backgroundColor: '#40A578', color: '#FFFFFF', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={9}>

                                {/* text field for the userinput  */}
                                <TextField
                                    variant="outlined"
                                    label="Search City"
                                    inputRef={inputRef}
                                    fullWidth
                                    InputProps={{
                                        style: { color: '#373A40' },
                                        onKeyDown: handleKeyDown
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>

                                {/* search button  */}
                                <IconButton color="" onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </Grid>
                        </Grid>

                        {weather && (
                            <>
                                <img src={weather.icon} alt="weather_display_icon" style={{ width: 100, height: 100 }} />
                                <Typography variant="h2" sx={{ fontWeight: 'bold', marginTop: '16px' }}>{weather.temperature}°C</Typography>
                                <Typography variant="h5" sx={{ color: 'text.secondary' }}>{weather.location}</Typography>

                                <Grid container spacing={2} marginTop={2}>
                                    <Grid item xs={6}>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <img src={HumidityIcon} alt="humidity" style={{ width: 24, height: 24, marginRight: 8 }} />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Humidity</Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{weather.humidity}%</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <img src={WindIcon} alt="wind" style={{ width: 24, height: 24, marginRight: 8 }} />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Wind Speed</Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{weather.windSpeed}Km/h</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </CardContent>
                </Card>
            </CardContent>

            {/* the toast alert for the input data when not entered   */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
        </Card>
    );
};

export default Weather;