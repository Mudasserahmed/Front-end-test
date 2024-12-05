import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card } from './Card';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';
import { Drawer, List, ListItem, ListItemText, IconButton } from "@mui/material";


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    const [open, setOpen] = React.useState(false); 

  // Toggle the sidebar on or off
  const toggleDrawer = () => {
    setOpen(!open);
  };

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const [meals, setMeals] = React.useState([]);
    const [selectedCards, setSelectedCards] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedWeek, setSelectedWeek] = React.useState(1);
    const [weeks, setWeeks] = React.useState({
        1: [],
        2: [],
        3: [],
        4: [],
    });

    React.useEffect(() => {
        getMeals();
    }, []);

    const getMeals = async () => {
        try {
            const response = await axios.get("https://dummyjson.com/recipes");
            if (response) {
                setMeals(response.data.recipes);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCardSelection = (card) => {
        setSelectedCards((prevSelected) => {
            if (prevSelected.includes(card)) {
                return prevSelected.filter((item) => item !== card);
            } else {
                return [...prevSelected, card];
            }
        });
    };

    const handleAddToWeek = () => {
        setOpenModal(true);
    };

    const handleWeekSelection = () => {
        setWeeks((prevWeeks) => {
            const updatedWeeks = { ...prevWeeks };

            // Prevent duplicate meal entries in the same week
            selectedCards.forEach((card) => {
                if (!updatedWeeks[selectedWeek].find((meal) => meal.id === card.id)) {
                    updatedWeeks[selectedWeek].push(card);
                }
            });

            return updatedWeeks;
        });

        setOpenModal(false);
        setSelectedCards([]);
    };

    const handleMealDelete = (week, mealId) => {
        setWeeks((prevWeeks) => {
            const updatedWeeks = { ...prevWeeks };
            updatedWeeks[week] = updatedWeeks[week].filter((meal) => meal.id !== mealId);
            return updatedWeeks;
        });
    };

    return (
        <Box sx={{ width: '100%' }}>

            {/* <div className=''> */}
            <Grid container>
                <Grid item sx={{
                    display: { xs: 'none', md: 'block' }
                }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: "auto", padding: "30px", marginLeft: "160px" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"

                        >
                            <Tab sx={{ marginRight: "40px" }} label="All Meals" {...a11yProps(0)} />
                            <Tab sx={{ marginRight: "40px" }} label="Week 1" {...a11yProps(1)} />
                            <Tab sx={{ marginRight: "40px" }} label="Week 2" {...a11yProps(2)} />
                            <Tab sx={{ marginRight: "40px" }} label="Week 3" {...a11yProps(3)} />
                            <Tab sx={{ marginRight: "40px" }} label="Week 4" {...a11yProps(4)} />

                            <button
                                className="bg-blue-950 text-white px-6 py-2 w-36 rounded-md ml-56"
                                onClick={handleAddToWeek}
                            >
                                Add to Week
                            </button>
                        </Tabs>
                    </Box>
                </Grid>
                <Grid item sx={{
                    display: { xs: 'block', md: 'none',width:"100%" }
                }}>
                       <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: "auto", padding: "30px", }}>
                        <Tabs
                            className='parent-tabs'
                            value={value}
                            onChange={handleChange}
                            orientation='vertical'
                            aria-label="basic tabs example"
                        >
                            <Tab  label="All Meals" {...a11yProps(0)} />
                            <Tab  label="Week 1" {...a11yProps(1)} />
                            <Tab  label="Week 2" {...a11yProps(2)} />
                            <Tab  label="Week 3" {...a11yProps(3)} />
                            <Tab  label="Week 4" {...a11yProps(4)} />

                            <button
                                className="bg-blue-950 text-white px-6 py-2 w-36 rounded-md"
                                onClick={handleAddToWeek}
                            >
                                Add to Week
                            </button>
                        </Tabs>
                    </Box>
                </Grid>
            </Grid>
            {/* </div> */}
            <div className="bg-gradient-to-r from-red-50 via-red-50 to-red-100 w-full">
                <CustomTabPanel value={value} index={0}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-32">
                        {meals.map((meal) => (
                            <div
                                key={meal.id}
                                onClick={() => handleCardSelection(meal)}
                                className='cursor-pointer'
                            >
                                <Card
                                    mealType={meal.mealType}
                                    image={meal.image}
                                    name={meal.name}
                                    instructions={meal.instructions}
                                    cuisine={meal.cuisine}
                                    rating={meal.rating}
                                    isSelected={selectedCards.includes(meal)}
                                />
                            </div>
                        ))}
                    </div>
                </CustomTabPanel>

                {Object.keys(weeks).map((weekIndex) => (
                    <CustomTabPanel value={value} index={parseInt(weekIndex)} key={weekIndex}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-32">
                            {weeks[weekIndex].map((meal) => (
                                <div key={meal.id} className="relative">
                                    <Card
                                        mealType={meal?.mealType}
                                        image={meal.image}
                                        name={meal.name}
                                        instructions={meal.instructions}
                                        cuisine={meal.cuisine}
                                        rating={meal.rating}
                                        onDelete={() => handleMealDelete(weekIndex, meal.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </CustomTabPanel>
                ))}
            </div>


            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="week-selection-modal"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'auto',
                }}
            >
                <Box
                    sx={{
                        padding: 3,
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        maxWidth: '800px',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>Select Week</Typography>

                    <div className="flex justify-center gap-4 mb-4 ">
                        {[1, 2, 3, 4].map((week) => (
                            <button
                                key={week}
                                onClick={() => setSelectedWeek(week)}
                                className={`p-2 rounded-lg font-bold ${selectedWeek === week ? 'bg-blue-500 text-white' : ''}`}
                            >
                                Week {week}
                            </button>
                        ))}
                    </div>
                    <Button
                        onClick={handleWeekSelection}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2, width: '100%' }}
                    >
                        Save
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
