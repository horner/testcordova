/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

// Define an async function to fetch data using XMLHttpRequest for Cordova, ensuring CORS compatibility
function fetchDataCordovaSafe() {
  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Configure the request for CORS compatibility
  xhr.open('GET', 'https://masterdaily.dev.webchart.app/webchart.cgi?f=wcrelease&json', true);

  // Set up what happens when the request is successfully completed
  xhr.onload = function() {
    // Check if the response status is OK
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        // Parse the JSON response
        const data = JSON.parse(xhr.responseText);
        // Display the fetched data in the 'webchart' div
        document.getElementById('webchart').innerHTML = JSON.stringify(data, null, 2);
      } catch (error) {
        // If an error occurs during JSON parsing, display it in the 'webchart' div
        document.getElementById('webchart').innerHTML = `Error: ${error.message}`;
      }
    } else {
      // If the response status is not OK, throw an error with the status
      document.getElementById('webchart').innerHTML = `HTTP error! status: ${xhr.status}`;
    }
  };

  // Set up what happens in case of an error with the request
  xhr.onerror = function() {
    // Display the error in the 'webchart' div
    document.getElementById('webchart').innerHTML = 'Request failed';
  };

  // Send the request
  xhr.send();
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    // Fetch https://masterdaily.dev.webchart.app/webchart.cgi?f=wcrelease&json 
    // and then diplay the content in the webchart div
    // if an error occurs, display the error in the webchart div
    fetchDataCordovaSafe();
        
}
