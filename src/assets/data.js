export const allData = [
  {
    title: "First Sample Project",
    id: 1,
    tasks: {
      todos: [
        {
          title: "BlahBlah",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          id: 13,
          follow: [{ name: "AP" }, { name: "MP" }, { name: "AD" }],
          created: "",
          closed: "",
        },
      ],
      inProgress: [],
      completed: [],
    },
  },
  {
    title: "Second Sample Project",
    id: 2,
    tasks: {
      todos: [],
      inProgress: [],
      completed: [],
    },
  },
  {
    title: "Third Sample Project",
    id: 3,
    tasks: {
      todos: [],
      inProgress: [
        {
          title: "BlahBlah",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          id: 13,
          follow: [{ name: "AP" }, { name: "MP" }, { name: "AD" }],
          created: "",
          closed: "",
        },
      ],
      completed: [],
    },
  },
];
