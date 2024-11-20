import { IUser } from "src/interfaces/iuser";
import { Connection } from "./connection";
import { Meetings } from "src/interfaces/meetings";
import { Session } from "./sesson";

export class User {
  public user: IUser;
  public firends?: Array<IUser>;
  public connection?: Connection;
  public session?: Session;

  constructor(user: IUser, connection?: Connection, firends?: Array<IUser>, session?: Session) {
    this.user = user;
    this.firends = firends ?? new Array<IUser>;
    this.connection = connection;
    this.session = session;
  }

  get_full_name() {
    return this.user.first_name + " " + this.user.last_name;
  }
  get_friend_full_name(friend: any) {
    return friend.first_name + " " + friend.last_name;
  }
  async get_meetings() {
    debugger
    let connections = await this.connection?.getDoc('meetings', this.user?.id.toString()) as Object;

    let meetings = connections as Meetings;
    let all_meetings = new Array;

    if (meetings && meetings.data.length > 0) {
      // Filtrar los IDs de usuarios que no son amigos
      let meets_ids = meetings.data
        .filter(x => !this.user.friends.includes(x.id_user)) // Filtra los IDs de usuarios no amigos
        .map(x => x.id_user); // Solo obtener los IDs de esos usuarios

      meetings.data = meetings.data
        .filter(x => !this.user.friends.includes(x.id_user)); // Filtra los IDs de usuarios no amigos;
      if (meets_ids.length > 0) {
        // Obtener documentos de usuarios que no son amigos

        all_meetings = await this.connection?.getDocs('users', meets_ids) as Array<User>;
      }
    }

    return { all_meetings, meetings };
  }


  async get_friends() {
    let finall_friends = new Array;
    if (this.user) {
      this.user.friends.forEach(friend => {
        if (!finall_friends.includes(friend))
          finall_friends.push(friend);
      });
      this.user.friends = this.user?.friends.filter(x => x != "");

    }

    return await this.connection?.getDocs('users', finall_friends) as Array<IUser>;
  }

  async get_recents(recent_id: string) {
    console.log("recientes... ", await this.connection?.getDoc('users', recent_id));
    return await this.connection?.getDoc('users', recent_id) as IUser;
  }

  async accept_friend(recent_id: string) {
    if (recent_id && this.user) {

      if (this.user.friends == undefined)
        this.user.friends = new Array<string>;
      this.user.friends.push(recent_id);
      await this.connection?.updateDoc('users', this.user?.id.toString(), { friends: this.user.friends });
      this.session?.update(this.user);
    }
  }

}