import { FormEvent, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
	const { user } = useAuth()
	const history = useHistory();
	const [newRoom, setNewRoom] = useState('');

	async function handleCreateRoom(event: FormEvent){ //FormEvent, é para typar o eventt
		event.preventDefault(); //Para o submit não recarregar a página

		if(newRoom.trim() === '') { //trim retira os espaços
			return;
		}

		const roomRef = database.ref('rooms') //Definindo uma categoria 'rooms'

		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id,
		})

		history.push(`/rooms/${firebaseRoom.key}`)
	}

	return (
		<div id="page-auth">
			<aside>
				<img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"></img>
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo-real</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logoImg} alt="Letmeask"></img>
					<h2>Criar uma nova sala</h2>
					<form onSubmit={handleCreateRoom}>
						<input
							type="text"
							placeholder="Nome da sala"
							onChange={event => {setNewRoom(event.target.value)}}
							value={newRoom}
						>
						</input>
						<Button type="submit">
							Criar sala
						</Button>
						<p>
							Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
						</p>
					</form>
				</div>
			</main>
		</div>
	)
}