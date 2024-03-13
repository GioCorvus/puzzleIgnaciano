import { Vista } from './vista.js';
import { ModeloPuzzle } from './../models/modelopuzzle.js';

export class Dos extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    this.modelopuzzle = new ModeloPuzzle();
  }
  textos = {
    0: "En una colina verde, bajo el cielo azul de Loyola, un joven llamado Ignacio corría con un bate de madera en la mano. A su lado, un pez azul saltaba del río, como si quisiera unirse a la aventura. Ignacio, vestido con sencillez pero con el corazón lleno de valentía, se dirigía hacia la antigua fortaleza que había sido su hogar.<br>La fortaleza de Loyola, con sus piedras gastadas por el tiempo, era testigo del cambio que se gestaba en el corazón de Ignacio. Es un joven soldado valiente y orgulloso con el afán de luchar.",
    1: "Iñigo, apasionado por la gloria y la aventura, vio su vida transformada tras ser herido en una batalla durante un trágico día.<br>Postrado en la cama, sin acceso a sus libros de caballería, encontró consuelo en textos religiosos que lo llevaron a una profunda reflexión espiritual…",
    2: "",
    3: "En su juventud, Ignacio era un caballero y soldado. Durante la Batalla de Pamplona en 1521, resultó gravemente herido por una bala de cañón. Durante su convalecencia, comenzó a leer libros sobre la vida de Cristo y los santos. Este período de recuperación marcó un cambio profundo en su vida. La imagen podría simbolizar ese momento en el que Ignacio, aún en su armadura, reflexiona sobre su propósito y destino.",
    4: "En ese momento mágico, San Ignacio sintió el amor y la paz de Dios en su corazón. Desde ese día, decidió ser un soldado para Dios y dedicar su vida a compartir el amor y la bondad con los demás.",
    5: "Ignacio era un hombre santo que amaba a Dios y a los demás. Un día, conoció a un anciano que no tenía casa ni familia. Ignacio le habló de Dios y de su vida. El anciano se sintió feliz y quiso ser amigo de Ignacio. Ignacio le dijo que era su hermano y que podía ser un jesuita.<br>Así, el anciano se unió a la Compañía de Jesús y vivió con Ignacio. Juntos, siguieron el camino del señor con alegría y humildad.",
    6: "Pedro era un niño enfermo que estaba en el hospital. El anciano era un hombre bueno que le contó la historia de Ignacio, un hombre santo que amaba a Dios y a los demás. Pedro se sintió feliz y quiso ser amigo del anciano. El anciano le dijo que era su nieto y que podía ser un jesuita.<br>Pedro se unió a la Compañía de Jesús y fue discípulo del anciano, ayudando a mucha gente con amor.",
    7: "Despidiendo el hospital, San Ignacio recordando las personas que se encontró en su instancia dando la palabra de Jesús, marca su rumbo hacia su próxima aventura. ",
    8: "Durante su convalecencia, comenzó a leer libros sobre la vida de Cristo y los santos. Este período de recuperación marcó un cambio profundo en su vida. La imagen podría simbolizar ese momento en el que Ignacio, aún en su armadura, reflexiona sobre su propósito y destino.",
    9: "",
    10: "Ignacio, junto a sus amigos, los integrantes de la nueva fundada compañía, celebra en comunión con todos los demás.",
    11: "En un tiempo de grandes cambios y descubrimientos, San Ignacio de Loyola, el valiente fundador de la Compañía de Jesús, recorría tierras lejanas llevando consigo no más que su fe y sus enseñanzas. Su corazón ardía con el deseo de compartir la luz del Evangelio y las revelaciones que había recibido durante sus momentos más íntimos de oración y contemplación.",
    12: "Un hombre que una vez blandió la espada en batalla, pero ahora porta la bandera del amor y el servicio. Su viaje lo ha llevado a través de valles de dudas y montañas de revelación, hasta llegar a este momento, donde su misión se despliega ante el mundo.<br>Mientras los peregrinos pasan, algunos se detienen, atraídos por la claridad de su mensaje. Ignacio les habla con pasión, sus palabras fluyen como un río de esperanza, instando a todos a encontrar a Dios en cada acto de amor, en cada gesto de servicio.",
    13: "Más tarde, en el año 1540, el papa Pablo aprobó oficialmente la fundación de la Compañía De Jesús. Durante los primeros años, Ignacio y los primeros miembros de la Compañía, promovieron la formación espiritual, estableciendo colegios y misiones en distintas partes del mundo.",
    14: "",
    15: "Y así termina la historia de San Ignacio de Loyola."
  }
}