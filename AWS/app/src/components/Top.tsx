// Top.tsx
import React, {useState} from 'react';
import '../styles/Info.css'


const Top: React.FC = () => {
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [healthModalOpen, setHealthModalOpen] = useState(false);

    const handleInfoClick = () => {
        console.log('Info clicked!');
        setInfoModalOpen(true);
    };

    const handleInfoClose = () => {
        setInfoModalOpen(false);
    };

    const handleHealthClick = () => {
        console.log('Accelerator Health clicked!');
        setHealthModalOpen(true);
    };

    const handleHealthClose = () => {
        setHealthModalOpen(false);
    };

    return (
        <div id='top'>
            <div id='top_modals'>
                <button id='info' className='modal' onClick={handleInfoClick}>
                    Info
                </button>
                {infoModalOpen && (
                    <div className="modal-overlay" >
                        <span className="close" onClick={handleInfoClose}>&times;</span>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()} >
                            <div className="modal-scroll">
                                <h1>Welcome to the IMPACT Dust Accelerator Laboratory Interface (Dust Data Digger)</h1>
                                <p>
                                    This Application interfaces with the IMPACT Lab AWS server and plots data shot by the lab's Pelletron Accelerator. Any dust data stored in our server can be plotted as a saveable .png and downloaded as a .csv file using this application.
                                </p>
                                <h2>Instructions:</h2>
                                <ol>
                                    <li>
                                        Log into LASP VPN. The application cannot be used without a LASP VPN connection.
                                    </li>
                                    <li id='error-info'>
                                        Temporary Measure: once logged into LASP VPN, open a new tab and enter <span>'https://10.247.28.237:3000'</span>. Click <span>'Advanced'</span> or <span>'show details'</span>, and then choose to proceed. Then restart the application by opening a new window or refreshing. This issue is a result of the SSL not yet being configured, and is required until it has been configured in order for your browser to trust the application domain. This will be resolved shortly and this step will then be removed.
                                    </li>
                                </ol>
                                <ul>
                                    <li>Server undergoes a routine rewrite every 4 hours. The server cannot be accessed during a rewrite. If steps 1 and 2 have been followed, and a server error persists, then a rewrite is in process. Wait a few minutes for the rewrite to complete, and try again.</li>
                                    <li>Enter the number of data instances you want to plot.</li>
                                    <li>If no value is selected 100 instances will be used as a default. It is not recommended to exceed 10,000 instances on a single plot due to data processing time.</li>
                                    <li>Enter values for any constraints you wish to use.</li>
                                    <li>Constraint options are Dust Type, Experiment Group, Experiment Name, Velocity [km/s], Mass[kg], Charge[C], Radius[m], Time YYYY-mm-dd HH:MM:SS.f [MDT], and Estimate Quality. Any constraints left empty will be ignored. If no data is plotted, no data fits the set constraints.</li>
                                    <li>Click Submit to plot the data.</li>
                                    <li>The default for the x-axis is Velocity. The default for the Y-axis is Mass.</li>
                                    <li>The X-axis and Y-axis dropdowns can be used to change the axis to any of the following options: Mass, Velocity, Charge, Trace Number, Radius, Estimate Quality, and Time.</li>
                                    <li>Using the buttons below the axis dropdowns, the user can toggle between Log Scale and Linear Scale for either axis.</li>
                                    <li>When hovering over the plot, a toolbar appears. This toolbar contains selectable tools to zoom, pan, change scale, and download the plot. The camera icon can be used to download the plot as a PNG.</li>
                                    <li>Below the plot is a data table containing all the plotted data.</li>
                                    <li>By default, the table contains all possible columns, and is sorted by Trace number in descending order.</li>
                                    <li>The user can use the dropdowns to limit the shown columns of the table and to sort the data by Trace Number, Velocity, Mass, Estimate Quality, Radius, Charge, Time, Dust Type, or Experiment Name.</li>
                                    <li>Above the table there is a button to toggle between sorting the table in descending and ascending order.</li>
                                    <li>The 'DOWNLOAD DATA AS CSV' button can be used to download the Data Table as a CSV File.</li>
                                </ul>
                                <h3>Happy Plotting!</h3>
                                <h2>Coming Soon:</h2>
                                <ul>
                                    <li>Desktop version of the application</li>
                                    <li>File drop for plotting data not found on the IMPACT server</li>
                                    <li>Matching QD waveforms to their respective dust hits.</li>
                                    <li>Accelerator Health Metrics</li>
                                </ul>
                                <p>
                                    Please Email <a href="mailto:aaron.kessler@lasp.colorado.edu">aaron.kessler@lasp.colorado.edu</a> and <a href="mailto:ethan.ayari@lasp.colorado.edu">ethan.ayari@lasp.colorado.edu</a> to report any bugs or to request changes or additions to the application.
                                </p>
                                {/* temp download buttons */}
                                <a href="https://yourserver.com/downloads/YourAppSetup.exe" download>Download for Windows</a>
                                <br />
                                <a href="https://yourserver.com/downloads/YourApp.dmg" download>Download for macOS</a>
                                <br />
                                <a href="https://yourserver.com/downloads/YourApp.AppImage" download>Download for Linux</a> 
                            </div> 
                        </div>
                    </div>
                )}
                <button id='health' className='modal' onClick={handleHealthClick}>
                    Accelerator Health
                </button>
                {healthModalOpen && (
                    <div className="modal-overlay" >
                        <span className="close" onClick={handleHealthClose}>&times;</span>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()} >
                            <div className="modal-scroll">
                                <h1>IMPACT Dust Accelerator Health Metrics</h1>
                                <h2>Coming Soon...</h2>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <h1 id='title'>Dust Data Digger (D&sup3;)</h1>
        </div>
    );
};

export default Top;