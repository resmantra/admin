import axios from "axios";
import EmailTemplate from "../models/EmailTemplate.js";
import Event from "../models/Event.js";
import Node from "../models/Node.js";
import Post from "../models/Post.js";
import Report from "../models/Report.js";
import User from "../models/User.js";
import dashboardHandler from "../utils/dashboard.js";
import componentLoader from "./component-loader.js";

const apiUrl = "http://localhost:4000/admin";

const Components = {
  Dashboard: componentLoader.add("Dashboard", "../pages/Dashboard.jsx"),
};

const options = {
  dashboard: {
    component: Components.Dashboard,
    handler: dashboardHandler,
  },
  componentLoader,
  rootPath: "/admin",
  branding: {
    companyName: "YKOP",
    logo: "https://ykop.com/favicon.ico",
    withMadeWithLove: false,
    favicon: "https://ykop.com/favicon.ico",
  },
  resources: [
    {
      resource: User,
      options: {
        sort: {
          sortBy: "createdAt",
          direction: "desc",
        },
        actions: {
          delete: {
            before: async (request, context) => {
              const { record } = context;
              if (!record || !record.params) {
                throw new Error("Record not found.");
              }
              const userId = record.params._id;

              try {
                await axios.post(`${apiUrl}/delete-user`, {
                  id: userId,
                });
                console.log(`API called successfully for user ID: ${userId}`);
              } catch (error) {
                console.error("Error calling external API:", error.message);
                throw new Error(
                  "Failed to call external API for data deletion."
                );
              }
              return request;
            },
          },
        },
        listProperties: [
          "_id",
          "username",
          "email",
          "emailVerified",
          "city",
          "gender",
          "createdAt",
          "lastInteraction",
          "defaultLanguage",
          "role",
        ],
        filterProperties: [
          "_id",
          "username",
          "email",
          "emailVerified",
          "city",
          "gender",
          "createdAt",
          "lastInteraction",
          "defaultLanguage",
          "role",
        ],
        editProperties: [
          "username",
          "email",
          "emailVerified",
          "city",
          "gender",
          "defaultLanguage",
          "role",
        ],
        showProperties: [
          "_id",
          "username",
          "email",
          "emailVerified",
          "city",
          "gender",
          "createdAt",
          "lastInteraction",
          "defaultLanguage",
          "role",
        ],
      },
    },
    {
      resource: Node,
      options: {
        _id: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },
        createdAt: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },
        updatedAt: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },
      },
    },
    {
      resource: Post,
      options: {
        actions: {
          delete: {
            before: async (request, context) => {
              const { record } = context;
              if (!record || !record.params) {
                throw new Error("Record not found.");
              }
              const postId = record.params._id;

              try {
                await axios.post(`${apiUrl}/delete-post`, {
                  id: postId,
                });
                console.log(`API called successfully for post ID: ${postId}`);
              } catch (error) {
                console.error("Error calling external API:", error.message);
                throw new Error(
                  "Failed to call external API for data deletion."
                );
              }
              return request;
            },
          },
        },
        _id: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },
        createdAt: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },
        updatedAt: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },
      },
    },
    {
      resource: Event,
      options: {
        actions: {
          delete: {
            before: async (request, context) => {
              const { record } = context;
              if (!record || !record.params) {
                throw new Error("Record not found.");
              }
              const eventId = record.params._id;

              try {
                await axios.post(`${apiUrl}/delete-event`, {
                  id: eventId,
                });
                console.log(`API called successfully for event ID: ${eventId}`);
              } catch (error) {
                console.error("Error calling external API:", error.message);
                throw new Error(
                  "Failed to call external API for data deletion."
                );
              }
              return request;
            },
          },
        },
        _id: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },
        createdAt: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },
        updatedAt: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },
      },
    },
    {
      resource: Report,
      options: {
        _id: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },
        createdAt: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },
        updatedAt: {
          isVisible: {
            edit: false,
            show: true,
            list: true,
            filter: true,
          },
        },
      },
    },
    {
      resource: EmailTemplate,
      options: {
        properties: {
          subject: {
            type: "json", // Allows easy editing in AdminJS
            isVisible: { list: false, edit: true, filter: false, show: true },
          },
          body: {
            type: "json",
            isVisible: { list: false, edit: true, filter: false, show: true },
          },
          attachments: {
            type: "array",
          },
        },
      },
    },
  ],
  locale: {
    language: "en",
    translations: {
      en: {
        labels: {
          User: "User",
          Node: "Node",
          emailVerified: {
            true: "Yes",
            false: "No",
          },
          role: {
            user: "user",
            admin: "admin",
          },
          deletedAccount: {
            true: "Yes",
            false: "No",
          },
          profilePic: { key: "Key" },
        },
        properties: {
          email: "Email",
          _id: "Id",
          username: "Username",
          emailVerified: "Email Verified",
          role: "Role",
          yearOfBirth: "Year Of Birth",
          interestRange: "Interest Range",
          defaultLanguage: "Default Language",
          gender: "Gender",
          defaultLocation: "Default Location",
          city: "City",
          refreshToken: "Refresh Token",
          deletedAccount: "Deleted Account",
        },
      },
    },
  },
  databases: [],
};
export default options;
