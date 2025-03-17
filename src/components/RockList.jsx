import { useEffect } from "react";

export const RockList = ({ rocks, fetchRocks, showAll }) => {
    useEffect(() => {
        fetchRocks(showAll);
    }, [showAll]);

    const handleDelete = async (event) => {
        const target = event.target.value;
        const response = await fetch(`http://localhost:8000/rocks/${target}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem("rock_token")).token
                }`,
                "Content-Type": "application/json",
            },
        });

        if (response.status === 204) {
            fetchRocks(showAll);
        }
    };

    const displayRocks = () => {
        if (rocks && rocks.length) {
            return rocks.map((rock) => (
                <div
                    key={`key-${rock.id}`}
                    className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50"
                >
                    <div>
                        {rock.name} ({rock.type.label}) weighs {rock.weight} kg{" "}
                    </div>
                    <div>
                        In the collection of {rock.user.first_name}{" "}
                        {rock.user.last_name}
                    </div>
                    {!showAll ? (
                        <div>
                            <button
                                type="button"
                                value={rock.id}
                                className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                onClick={(event) => {
                                    handleDelete(event);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ));
        }

        return <h3>Loading Rocks...</h3>;
    };

    return (
        <>
            <h1 className="text-3xl">Rock List</h1>
            {displayRocks()}
        </>
    );
};
