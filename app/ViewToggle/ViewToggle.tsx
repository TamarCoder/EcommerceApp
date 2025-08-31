"use client"
import {Grid, List} from "lucide-react";

import {useState} from "react";


const ViewToggle = () =>  {


    const [isGridView, setIsGridView] = useState(true);

    return (
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
            <button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded ${
                    isGridView ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                } transition-colors`}
            >
                <Grid className="w-4 h-4" />
            </button>
            <button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded ${
                    !isGridView ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                } transition-colors`}
            >
                <List className="w-4 h-4" />
            </button>
        </div>
    )
}

export default ViewToggle;