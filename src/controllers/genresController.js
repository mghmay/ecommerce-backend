import {getAllGenres} from "../actions/genresActions";

export async function handleGetAllGenres(req, res) {
	try {
		const genres = await getAllGenres();

		res.status(200).json(genres);
	} catch (e) {
		res.status(404).json({error: e.message});
	}
}
