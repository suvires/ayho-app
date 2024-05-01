"use client";

import { Offer, User } from "@/lib/definitions";
import { Like } from "@/ui/components/like";
import { Dislike } from "@/ui/components/dislike";
import { Undo } from "@/ui/components/undo";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { likeOffer, dislikeOffer, undo } from "@/lib/actions";

interface OfferItemProps {
  offer: Offer;
  user: User;
}

export default function OfferCard({ offer, user }: OfferItemProps) {
  const cardRef = useRef(null);
  const DECISION_THRESHOLD = 75;

  const handleLikeOffer = async () => {
    await likeOffer(offer.id);
  };

  const handleUndo = async () => {
    await undo();
  };

  const handleDislikeOffer = async () => {
    await dislikeOffer(offer.id);
  };

  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current as HTMLElement;
    let isAnimating = false;
    let pullDeltaX = 0;
    function startDrag(
      event: MouseEvent | TouchEvent,
      actualCard: HTMLElement
    ) {
      if (isAnimating) return;

      // get initial position of mouse or finger
      let startX: number;
      if (event instanceof MouseEvent) {
        startX = event.clientX;
      } else {
        startX = event.touches[0].clientX;
      }

      // listen the mouse and touch movements
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onEnd);

      document.addEventListener("touchmove", onMove, { passive: true });
      document.addEventListener("touchend", onEnd, { passive: true });

      function onMove(event: MouseEvent | TouchEvent) {
        // current position of mouse or finger
        let currentX;
        if (event instanceof MouseEvent) {
          currentX = event.clientX;
        } else {
          currentX = event.touches[0].clientX;
        }

        // the distance between the initial and current position
        pullDeltaX = currentX - startX;

        // there is no distance traveled in X axis
        if (pullDeltaX === 0) return;

        // change the flag to indicate we are animating
        isAnimating = true;

        // calculate the rotation of the card using the distance
        const deg = pullDeltaX / 14;

        // apply the transformation to the card
        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`;

        // change the cursor to grabbing
        actualCard.style.cursor = "grabbing";

        // change opacity of the choice info
        const opacity = Math.abs(pullDeltaX) / 100;
        const isRight = pullDeltaX > 0;

        const choiceEl = isRight
          ? actualCard.querySelector(".choice.like")
          : actualCard.querySelector(".choice.dislike");
        if (choiceEl) {
          const choiceEl2 = choiceEl as HTMLElement;
          choiceEl2.style.opacity = opacity.toString();
        }
      }

      function onEnd(event: MouseEvent | TouchEvent) {
        // remove the event listeners
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onEnd);

        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onEnd);

        // saber si el usuario tomo una decisión
        const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD;

        if (decisionMade) {
          const goRight = pullDeltaX >= 0;

          // add class according to the decision
          actualCard.classList.add(goRight ? "go-right" : "go-left");
          actualCard.addEventListener("transitionend", () => {
            //actualCard.remove();
            if (goRight) {
              likeOffer(offer.id);
            } else {
              dislikeOffer(offer.id);
            }
          });
        } else {
          actualCard.classList.add("reset");
          actualCard.classList.remove("go-right", "go-left");

          actualCard.querySelectorAll(".choice").forEach((choice) => {
            if (choice instanceof HTMLElement) choice.style.opacity = "0";
          });
        }

        // reset the variables
        actualCard.addEventListener("transitionend", () => {
          actualCard.removeAttribute("style");
          actualCard.classList.remove("reset");

          pullDeltaX = 0;
          isAnimating = false;
        });

        // reset the choice info opacity
        actualCard.querySelectorAll(".choice").forEach((el) => {
          const choiceEl = el as HTMLElement;
          choiceEl.style.opacity = "0";
        });
      }
    }

    card.addEventListener("mousedown", (event) => startDrag(event, card));
    card.addEventListener("touchstart", (event) => startDrag(event, card), {
      passive: true,
    });

    return () => {
      card.removeEventListener("mousedown", (event) => startDrag(event, card));
      card.removeEventListener("touchstart", (event) => startDrag(event, card));
    };
  }, [offer.id]);

  return (
    <div className="card" ref={cardRef}>
      <div className="choice dislike">NOPE</div>
      <div className="choice like">LIKE</div>
      <article className="offer">
        <section className="offer--company-summary">
          <figure>
            <Image
              width={offer.company.image_width}
              height={offer.company.image_height}
              alt={`Logotipo de ${offer.company.name}`}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${offer.company.image_url}`}
              priority={true}
            />
          </figure>
          <div>
            <h3>{offer.company.name}</h3>
            <a href={`#offer--company-profile-${offer.id}`}>
              Ver perfil de la empresa
            </a>
          </div>
        </section>
        <h2>{offer.title}</h2>
        <ul className="tags">
          {offer.positions.map((position) => (
            <li
              key={`tag--position-${position.id}`}
              className={position.id in user.positions ? "active" : "disabled"}
            >
              <span>{position.name}</span>
            </li>
          ))}
          <li
            className={
              offer.salary >= user.profile.salary ? "active" : "disabled"
            }
          >
            <span>{`${Number(offer.salary)
              .toLocaleString("es-ES", { useGrouping: true })
              .replace(/\./g, " ")} €`}</span>
          </li>

          {offer.schedules.map((schedule) => (
            <li
              key={`tag--place-${schedule.id}`}
              className={schedule.id in user.schedules ? "active" : "disabled"}
            >
              <span>{schedule.name}</span>
            </li>
          ))}
          {offer.attendances.map((attendance) => (
            <li
              key={`tag--place-${attendance.id}`}
              className={
                attendance.id in user.attendances ? "active" : "disabled"
              }
            >
              <span>{attendance.name}</span>
            </li>
          ))}
          {offer.places.map((place) => (
            <li
              key={`tag--place-${place.id}`}
              className={place.id in user.places ? "active" : "disabled"}
            >
              <span>{place.name}</span>
            </li>
          ))}
        </ul>
        <h4>Habilidades</h4>
        <ul className="tags">
          {offer.skills.map((skill) => (
            <li
              key={`tag--skills-${skill.id}`}
              className={skill.id in user.skills ? "active" : "disabled"}
            >
              <span>{skill.name}</span>
            </li>
          ))}
        </ul>
        <h4>Descripción</h4>
        <section
          className="offer--description"
          dangerouslySetInnerHTML={{ __html: offer.description }}
        ></section>
        <section
          className="offer--company-profile"
          id={`offer--company-profile-${offer.id}`}
        >
          <figure>
            <Image
              width={offer.company.image_width}
              height={offer.company.image_height}
              alt={`Logotipo de ${offer.company.name}`}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${offer.company.image_url}`}
              loading="lazy"
            />
          </figure>
          <h3>{offer.company.name}</h3>
          <div
            className="offer--company-description"
            dangerouslySetInnerHTML={{ __html: offer.company.description }}
          ></div>
        </section>
        <aside>
          <Undo handleUndo={handleUndo} />
          <Dislike handleDislikeOffer={handleDislikeOffer} />
          <Like handleLikeOffer={handleLikeOffer} />
        </aside>
      </article>
    </div>
  );
}
