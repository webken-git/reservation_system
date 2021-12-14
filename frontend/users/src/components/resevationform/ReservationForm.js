import React, { useState, useEffect } from "react";
import axios from "axios";
import {  nonprofit, profit,usage,} from './FormDataList';
import { useForm,Controller } from "react-hook-form";
import { FormControl,FormControlLabel, TextField ,Checkbox , FormGroup,RadioGroup,Radio} from '@mui/material';


export const ReservationForm = () => {
    const [ageData, setAgeData] = useState([])
    useEffect(() => {
        const getAgeUser = async() => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/ages/`)
            try {
                setAgeData(res.data)
                // console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getAgeUser()
    }, [])
    const { register, handleSubmit, errors, reset, control } = useForm();
    const profits = profit
    const nonprofits = nonprofit
    const usages = usage
    const onSubmit = data => console.log(data);
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>予約情報入力</h1>
                <FormControl>
                    <FormGroup>
                        <Controller
                            //Checkboxを制御するController
                            control={control}
                            name="ageGroup"
                            rules={{ required: "選択してください。" }}
                            render={({
                                field,
                                
                        
                            }) => (
                                <>
                                    <p>年齢:</p>
                            
                                    {ageData.map((ageGroup, i) => (
                                        <FormControlLabel
                                    {...field}
                                    key={i}
                                    label={ageGroup.name}
                                    control={
                                        <Checkbox value={ageGroup.id} />
                                    }
                                />
                            ))}
                                </>
                            )}
                        />

                        <Controller
                            //radio buttonを制御するController
                            name="RadioGroup"
                            control={control}
                            rules={{ required: "選択してください。" }}
                            render={({
                                field, 
                            }) => (
                                <>
                                    <p>利用区分:</p>
                                    <RadioGroup  {...field}>
                                        <p>アマチュアスポーツ</p>
                                        {usages.map((usage, i) => (
                                            <FormControlLabel
                                                key={i}
                                                value={usage.value}
                                                control={<Radio />}
                                                label={usage.label}
                                            />
                                        ))}
                                    </RadioGroup>
                                    <RadioGroup>
                                        <p>営利</p>
                                        {profits.map((profit, i) => (
                                            <FormControlLabel
                                                key={i}
                                                value={profit.value}
                                                control={<Radio />}
                                                label={profit.label}
                                            />
                                        ))}
                                    </RadioGroup>
                                    <RadioGroup>
                                        <p>非営利</p>
                                        {nonprofits.map((nonprofit, i) => (
                                            <FormControlLabel
                                                key={i}
                                                value={nonprofit.value}
                                                control={<Radio />}
                                                label={nonprofit.label}
                                            />
                                        ))}
                                    </RadioGroup>
                                </>
                            )}
                        />
                        <Controller
                            name="TestFiled"
                            control={control}
                            rules={{ required: true }}
                            defaultValue="aaaa"
                            render={(field, fieldState) => (
                                <TextField {...field}/>
                            
                            )}
                        
                        />

                    </FormGroup>
                </FormControl>
                <button variant="contained" type="submit">
                    Submit
                </button>
            </form>
            
        </>

    )
}