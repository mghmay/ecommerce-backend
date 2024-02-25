import db from "../db";

export async function getAllGenres() {
	try {
		const genreObjects = await db.collection("genres").find().toArray();
		if (!genreObjects) throw new Error("Couldn't get genres!");
		const genres = genreObjects.map((obj) => obj.genre);

		return genres;
	} catch (e) {
		throw e;
	}
}
