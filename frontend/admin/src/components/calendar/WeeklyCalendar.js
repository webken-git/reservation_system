import React from "react";
import axios from "axios";
import './calendar.scss';

const WeeklyCalendar = (props) =>{
    const date = props.date;

    return (
            <div className="calendar">
                <div className="head-row">
                    <div className="timeline"></div>
                    <div className="head">
                        <p className="day">日</p>
                        <p className="date">1</p>
                    </div>
                    <div className="head">
                        <p className="day">月</p>
                        <p className="date">2</p>
                    </div>
                    <div className="head">
                        <p className="day">火</p>
                        <p className="date">3</p>
                    </div>
                    <div className="head">
                        <p className="day">水</p>
                        <p className="date">4</p>
                    </div>
                    <div className="head">
                        <p className="day">木</p>
                        <p className="date">5</p>
                    </div>
                    <div className="head">
                        <p className="day">金</p>
                        <p className="date">6</p>
                    </div>
                    <div className="head">
                        <p className="day">土</p>
                        <p className="date">7</p>
                    </div>
                </div>
                <div className="content-row">
                    <div className="timeline">
                        <div><p>0</p></div>
                        <div><p>1</p></div>
                        <div><p>2</p></div>
                        <div><p>3</p></div>
                        <div><p>4</p></div>
                        <div><p>5</p></div>
                        <div><p>6</p></div>
                        <div><p>7</p></div>
                        <div><p>8</p></div>
                        <div><p>9</p></div>
                        <div><p>10</p></div>
                        <div><p>11</p></div>
                        <div><p>12</p></div>
                        <div><p>13</p></div>
                        <div><p>14</p></div>
                        <div><p>15</p></div>
                        <div><p>16</p></div>
                        <div><p>17</p></div>
                        <div><p>18</p></div>
                        <div><p>19</p></div>
                        <div><p>20</p></div>
                        <div><p>21</p></div>
                        <div><p>22</p></div>
                        <div><p>23</p></div>
                    </div>
                    <div className="content">
                        <div className="content-span">
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                            <div className="content-div"></div>
                        </div>
                    </div>
                    <div className="content">
                            <div className="content-span">
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                            </div>
                        </div>
                    <div className="content">
                            <div className="content-span">
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                            </div>
                        </div>
                    <div className="content">
                            <div className="content-span">
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                            </div>
                        </div>
                    <div className="content">
                            <div className="content-span">
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                            </div>
                        </div>
                    <div className="content">
                            <div className="content-span">
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                            </div>
                        </div>
                    <div className="content">
                            <div className="content-span">
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                                <div className="content-div"></div>
                            </div>
                        </div>
                </div>
            </div>
        );
    }

    export default WeeklyCalendar;