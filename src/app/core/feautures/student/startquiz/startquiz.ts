import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../../../service/quizservice';
import { AnswerService } from '../../../../service/answerService';

@Component({
  selector: 'app-startquiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './startquiz.html',
  styleUrl: './startquiz.css'
})
export class Startquiz implements OnInit, OnDestroy {


  timeLeft = 0;
  minutes = 0;
  seconds = 0;

  interval: any;


  questions: any[] = [];

  selectedAnswers: any = {};


  currentQuestion = 0;

  isLoading = true;


  attemptId!: number;

  quizId!: number;



  constructor(

    private route: ActivatedRoute,

    private quizService: QuizService,

    private answerService: AnswerService,

    private cdf: ChangeDetectorRef,

    private router: Router

  ) {}



  ngOnInit(): void {


    this.quizId =
      Number(localStorage.getItem('quizId'));



    const duration =
      Number(localStorage.getItem('duration')) || 1;



    this.timeLeft = duration * 60;


    this.updateTimer();


    this.startTimer();



    const savedAttemptId =
      localStorage.getItem(
        `attemptId_${this.quizId}`
      );



    if(savedAttemptId){
      // Continue existing quiz
      this.attemptId =Number(savedAttemptId);
      console.log(
        "Existing Attempt:",
        this.attemptId
      );
     // this.loadPreviousAnswers();
    }
    else{
     // Create new attempt
      const userId =
      Number(localStorage.getItem('userId'));
     const attempt = {
       userId:userId,
       quizId:this.quizId,
       score:0,
       status:'IN_PROGRESS'
     };
     this.quizService
      .createAttempt(attempt)
      .subscribe({
        next:(res:any)=>{
         console.log(
            "Attempt Created:",
            res
          );
          this.attemptId =
          res.data.id;
          localStorage.setItem(
            `attemptId_${this.quizId}`,
            this.attemptId.toString()
          );
          console.log(
            "Attempt ID:",
            this.attemptId
          );
       },
        error:err=>{
          console.error(
            "Attempt Error:",
            err
          );
        }
      });
    }
    this.route.paramMap.subscribe(params=>{
     const title =
      decodeURIComponent(
        params.get('title') || ''
      );
     if(title){
       this.loadQuestions(title);
     }
   });
  }
  loadQuestions(title:string){
    this.quizService
    .getQuestionsByStudent(title)
    .subscribe({
      next:(res:any)=>{
       console.log(
          "Questions:",
          res
        );
        this.questions =
        res.data || [];
        this.isLoading=false;
        if(this.attemptId){
          this.loadPreviousAnswers();
        }
       this.cdf.detectChanges();
      },
     error:err=>{
       console.error(err);
       this.questions=[];
       this.isLoading=false;
      }
   });
  }
 saveAnswer(questionId:number, optionId:number){
  console.log(
    "SAVE ANSWER CLICKED",
    {
      attemptId:this.attemptId,
      questionId:questionId,
      optionId:optionId
    }
  );
  if(!this.attemptId){
   console.log("Attempt ID is missing");
    return;
  }
  const answer = {
   attemptId:this.attemptId,
   questionId:questionId,
   selectedOptionId:optionId
  };
  this.answerService.saveAnswer(answer)
  .subscribe({
    next:(res:any)=>{
      console.log(
        "ANSWER SAVED RESPONSE",
        res
      );
    },
    error:(err)=>{
     console.error(
        "ANSWER SAVE ERROR",
        err
      );
    }
  });
}
 loadPreviousAnswers(){
   this.answerService
    .getPreviousAnswers(this.attemptId)
    .subscribe({
     next:(res:any)=>{
       console.log(
          "Previous Answer Response:",
          res
        );
       const answers =
        res.data || [];
       answers.forEach(
          (answer:any)=>{
         this.selectedAnswers[
            answer.questionId
          ] =
          answer.selectedOptionId;
        });
        console.log(
          "Restored Answers:",
          this.selectedAnswers
        );
        this.cdf.detectChanges();
     },
     error:err=>{
       console.error(
          "Previous Answer Error:",
          err
        );
      }
    });
 }
  nextQuestion(){
    if(
      this.currentQuestion <
      this.questions.length-1
    ){
      this.currentQuestion++;
    }
  }
  previousQuestion(){
    if(this.currentQuestion > 0){
      this.currentQuestion--;
    }
  }
  submitQuiz(){
   const answers =
    this.questions.map(question=>({
      questionId:question.id,
     selectedOptionId:
      this.selectedAnswers[
        question.id
      ]
    }));
    const request = {
     answers:answers
    };
    this.quizService
    .submitQuiz(
      this.attemptId,
      request
    )
    .subscribe({
     next:(res:any)=>{
        console.log(
          "Quiz Submitted",
          res
        );
        localStorage.removeItem(
          `attemptId_${this.quizId}`
        );
       this.router.navigate([
          '/student/results',
          this.attemptId
        ]);
      },
      error:err=>{
        console.error(
          "Submit Error:",
          err
        );
     }
    });
  }
  startTimer(){
    this.interval =
    setInterval(()=>{
     if(this.timeLeft > 0){
        this.timeLeft--;
        this.updateTimer();
        this.cdf.detectChanges();
      }
     else{
        clearInterval(
          this.interval
        );
       alert(
          "Time Up!"
        );
        this.submitQuiz();
      }
    },1000);
  }
 updateTimer(){
    this.minutes =
    Math.floor(
      this.timeLeft / 60
    );
    this.seconds =
    this.timeLeft % 60;
  }
  ngOnDestroy(){
    if(this.interval){
     clearInterval(
        this.interval
      );
    }
 }
}
