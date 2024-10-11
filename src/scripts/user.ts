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
    this.firends = firends;
    this.connection = connection;
    this.session = session;
  }

  get_full_name() {
    return this.user.first_name + " " + this.user.last_name;
  }

  async get_meetings() {
    let meetings = await this.connection?.getDoc('meetings', this.user?.id.toString()) as Meetings;
    let new_meetings = new Array;
    let all_meetings = new Array;
    if (meetings && this.user.friends) {
      if (meetings.data.length > 0) {
        meetings.data.forEach(meet => {
          if (this.firends?.filter(x => x.id == meet.id_user) != undefined) {
            let indexToRemove = meetings?.data.indexOf(meet) ?? -1;
            if (indexToRemove > -1)
              meetings?.data.splice(indexToRemove);
          }
        });
        meetings.data = new_meetings;
        if (this.user)
          await this.connection?.updateDoc('meetings', this.user.id.toString(), meetings);

        let meets_ids = meetings.data.map(x => x.id_user);
        all_meetings = await this.connection?.getDocs('users', meets_ids) as Array<User>;
      }
    }

    return all_meetings;
  }

  async get_friends() {
    return await this.connection?.getDocs('users', this.user?.friends) as Array<IUser>;
  }

  async get_recents(recent_id: string){
    console.log("recientes... ",await this.connection?.getDoc('users', recent_id));
    return await this.connection?.getDoc('users', recent_id) as IUser;
  }

  async accept_friend(recent_id: string) {
    if (recent_id && this.user) {
      this.user?.friends.push(recent_id);
      await this.connection?.updateDoc('users', this.user?.id.toString(), { friends: this.user?.friends });
      this.session?.update(this.user);
    }
  }

}