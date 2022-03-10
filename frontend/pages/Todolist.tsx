import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Todo } from "../../backend/src/Tasks/interfaces/task.interface";
import { secureHeapUsed } from "crypto";
// import "bootstrap/dist/css/bootstrap.css";

interface props {
	name: string;
}

export default function Todolis(props: props): JSX.Element {
	const { name } = props;
	const [list, setList] = useState<Array<Todo>>([]);
	const [textValue, setTextValue] = useState<string>("");
	const [sec, setSeconds] = useState(0);

	async function fetchdata() {
		await fetch("http://127.0.0.1:5000/")
			.then((res) => res.json())
			.then((res) => setList(res))
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		fetchdata();
	}, []);

	const clearList = async (event: any) => {
		event.preventDefault();
		fetch("http://127.0.0.1:5000/", {
			method: "DELETE",
		}).then(() => {
			fetchdata();
		});
	};

	const handelInput = (event: any) => {
		setTextValue(event.nativeEvent.target.value);
	};
	const submitHandler = async (event: any) => {
		event.preventDefault();
		const value = event.target.elements.add.value;
		if (value != "") {
			const elm: Todo = {
				Task: value,
				Stat: false,
			};
			await fetch("http://127.0.0.1:5000/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(elm),
			});
			setTextValue("");
			fetchdata();
		}
	};

	const doneHandler = async (event:any, Newe: Todo) => {
		event.preventDefault();
		console.log(Newe);
		const action = event.target.value;
		const stat = (action === 'done') ? true : false;
		const elm: Todo = {
			id: Newe.id,
			Task: Newe.Task,
			Stat: stat
		};
		await fetch(`http://127.0.0.1:5000/put`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(elm),
		});
		fetchdata();
	}

	const removeTaskHandler = async (event: any, id?: number) => {
		if (typeof id !== "undefined") {
			console.log(id);
			event.preventDefault();
			await fetch(`http://127.0.0.1:5000/${id}`, {
				method: "POST",
			})
				.then(() => fetchdata())
				.catch((err) => console.log(err));
		}
	};

	const listCount = () => {
		if ( list.length === 0)
			return false;
		return true;
	}
	return (
		<>
			<div className={styles.main}>
				<h2 className={styles.title}>
					Hello To, <span className={styles.span}>{name}</span> Todo List
				</h2>
				{ !listCount() &&
					<h2 className={styles.empty}>
						<i className="fa-solid fa-list-check"></i> <span>Add a Task</span>
					</h2>
				}
				{listCount() &&
					<div className={styles.card}>
					<ul>
						{list.map((elm) => (
							<li key={elm.id} className={styles.code}>
								<div
									className={`${styles.code} ${styles.flex}`}
									>
									<span
										className={`${styles.code} ${styles.text}`}
										>
										{elm.Task}
									</span>
									<div className="btn-group" onChange={(e) => doneHandler(e, elm)}>
										<input
											type="radio"
											className={styles.radio}
											name={`btn-${elm.id}`}
											id={`btnradio1-${elm.id}`}
											autoComplete="off"
											value="done"
											checked={elm.Stat === true}
											onChange={(e) => doneHandler(e, elm)}
										/>
										<label
											className={`${styles.group} ${styles.done}`}
											htmlFor={`btnradio1-${elm.id}`}
											>
											Done
										</label>
										<input
											type="radio"
											className={styles.radio}
											name={`btn-${elm.id}`}
											id={`btnradio2-${elm.id}`}
											autoComplete="off"
											value="ongoing"
											checked={!elm.Stat === true}
											onChange={(e) => doneHandler(e, elm)}
											/>
										<label
											className={`${styles.group} ${styles.onGoing}`}
											htmlFor={`btnradio2-${elm.id}`}
											>
											OnGoing
										</label>
									</div>
									<i
										className="fa-solid fa-xmark fa-lg"
										style={{ color: "red" }}
										onClick={(e) =>
											removeTaskHandler(e, elm.id)
										}
									></i>
								</div>
							</li>
						))}
					</ul>
				</div>
				}
				<div className={styles.box}>
					<form onSubmit={submitHandler} className={styles.form}>
						<input
							className={styles.input}
							type="text"
							name="add"
							value={textValue}
							onChange={handelInput}
						/>
						<input
							className={styles.button}
							type="submit"
							name="button-add"
							value="Add"
						/>
						<input
							className={`${styles.button} ${styles.secondary}`}
							type="submit"
							name="button-clr"
							value="Clear"
							onClick={clearList}
						/>
					</form>
				</div>
			</div>
		</>
	);
}
