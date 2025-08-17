import List from "@/components/List";

interface ListItem {
  title: string;
  status: string;
  rating: number;
  subtitle: string;
}

const data: ListItem[] = [
  {
    title: "Vidio",
    status: "Free",
    rating: 0,
    subtitle: "Softsub",
  },
  {
    title: "CATCHPLAY+",
    status: "Free",
    rating: 0,
    subtitle: "Softsub",
  },
  {
    title: "Ani-One Asia",
    status: "Berbayar",
    rating: 0,
    subtitle: "Softsub",
  },
  {
    title: "Ani-One Indonesia",
    status: "Berbayar",
    rating: 0,
    subtitle: "Hardsub",
  },
  {
    title: "Bstation",
    status: "Berbayar",
    rating: 0,
    subtitle: "Softsub",
  },
];

const Pages = () => {
    return(
     <div className="min-h-screen p-4 bg-black">
        <div className="container mx-auto">
            <List items={data} />
        </div>
    </div>
    )
}

export default Pages;