// import Candidate from '../models/candidateModel.js';

// const registerCandidate = async (req, res) => {
//     try {
//         const { name, address, phoneNumber, email, password } = req.body;

//         const candidateExists = await Candidate.findOne({ email });
//         if (candidateExists) {
//             return res.status(400).json({ error: 'Candidate already exists' });
//         }

//         const newCandidate = new Candidate({
//             name,
//             address,
//             phoneNumber,
//             email,
//             password
//         });

//         await newCandidate.save();

//         return res.status(201).json({ message: 'Candidate registered successfully', candidate: newCandidate });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// export { registerCandidate };


import Candidate from '../models/candidateModel.js';

const registerCandidate = async (req, res) => {
    try {
        const { name, address, phoneNumber, email, password } = req.body;

        const candidateExists = await Candidate.findOne({ email });
        if (candidateExists) {
            return res.status(400).json({ error: 'Candidate already exists' });
        }

        const newCandidate = new Candidate({
            name,
            address,
            phoneNumber,
            email,
            password
        });

        await newCandidate.save();

        return res.status(201).json({ message: 'Candidate registered successfully', candidate: newCandidate });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// const deleteCandidate = async (req, res) => {
//     try {
//         const candidate = await Candidate.findById(req.params.id);
//         if (!candidate) {
//             return res.status(404).json({ error: 'Candidate not found' });
//         }
//         await Candidate.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: 'Candidate deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
const deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findOne({ email: req.params.email });
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        await Candidate.findOneAndDelete({ email: req.params.email });
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export { registerCandidate, getCandidates, deleteCandidate };
