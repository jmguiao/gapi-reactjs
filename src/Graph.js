import React, { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";
//import gapi from "gapi-client";

function App() {
  //remove authResponse
  const [openPicker, data] = useDrivePicker();
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: "",
      developerKey: "",
      viewId: "DOCS",
      token: "",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    });
  };

  useEffect(() => {
    // do anything with the selected/uploaded files
    if (data) {
      try {
        //data.docs.map((i) => console.log(i.id));
        data.docs.map(({ id }) =>
          window.gapi.client.drive.permissions.create({
            fileId: id,
            //fields: "id",
            //permissionId: "anyoneWithLink",
            //transferOwnership: true,
            resource: {
              role: "reader",
              type: "anyone",
              // // role: "owner",
              // emailAddress: "tmq.guiaojm2992@gmail.com", // new owner email
              // type: "user",
            },
          })
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [data]);

  return (
    <div>
      <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </div>
  );
}

export default App;
