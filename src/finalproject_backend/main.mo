import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
// import List "mo:base/List";
import Principal "mo:base/Principal";

actor {

  public shared query (msg) func whoami() : async Principal {
    msg.caller;
  };

  public type PetPostId = Nat32;
  public type Comment = {
    text : Text;
    author : Text;
    id: Nat32;
  };

  public type PetPostType = {
    author : Text;
    id : PetPostId;
    title : Text;
    message : Text;
    selectedFile : Text;
    createdAt : Text;
    description : Text;
    location : Text;
    comments : [Comment];
  };

  private stable var petposts : Trie.Trie<PetPostId, PetPostType> = Trie.empty();

  public query func getPetPosts() : async [PetPostType] {
    let iterator = Trie.iter(petposts);
    let array = Iter.toArray(iterator);
    let posts = Array.map<(PetPostId, PetPostType), PetPostType>(array, func((_, post)) { post });
    return posts;
  };

  public func create(petpost : PetPostType) : async PetPostId {
    let petpostId = petpost.id;
    petposts := Trie.replace(
      petposts,
      key(petpostId),
      Nat32.equal,
      ?petpost,
    ).0;
    petpostId;
  };

  public func read(petpostId : PetPostId) : async ?PetPostType {
    let result = Trie.find(petposts, key(petpostId), Nat32.equal);
    result;
  };

  public func update(petpostId : PetPostId, petpost : PetPostType) : async Bool {
    let result = Trie.find(petposts, key(petpostId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      petposts := Trie.replace(
        petposts,
        key(petpostId),
        Nat32.equal,
        ?petpost,
      ).0;
    };
    exists;
  };

  // public func addComment(petpost: PetPostType, comment: Text): async Comments {
  //     let petpostId = petpost.id;
  //     let updatedComments = Buffer.add<Text>(comment, petpost.comments);
  //     petpost.comments.add(comment);
  //     petposts := Trie.replace(
  //       petposts,
  //       key(petpostId),
  //       Nat32.equal,
  //       ?petpost,
  //     ).0;
  //     return updatedComments;
  // };

  public func delete(petpostId : PetPostId) : async Bool {
    let result = Trie.find(petposts, key(petpostId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      petposts := Trie.replace(
        petposts,
        key(petpostId),
        Nat32.equal,
        null,
      ).0;
    };
    exists;
  };

  private func key(x : PetPostId) : Trie.Key<PetPostId> {
    { hash = x; key = x };
  };

};
